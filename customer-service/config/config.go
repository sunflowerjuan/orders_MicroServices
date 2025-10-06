package config

import (
    "customer-service/model"
    "fmt"
    "log"
    "os"
    "time"

    "github.com/ArthurHlt/go-eureka-client/eureka"
    "gorm.io/driver/postgres"
    "gorm.io/gorm"
)

func InitDB() *gorm.DB {
    host := os.Getenv("DB_HOST")
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASS")
    dbname := os.Getenv("DB_NAME")
    port := os.Getenv("DB_PORT")

    dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
        host, user, password, dbname, port)

    db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
    if err != nil {
        log.Fatal("Error connecting to DB:", err)
    }

    // Migrar el modelo
    err = db.AutoMigrate(&model.Customer{})
    if err != nil {
        log.Fatal("Error migrando modelo:", err)
    }

    return db
}

func RegisterEureka() {
    eurekaHost := os.Getenv("EUREKA_HOST")
    eurekaPort := os.Getenv("EUREKA_PORT")

    client := eureka.NewClient([]string{
        fmt.Sprintf("http://%s:%s/eureka", eurekaHost, eurekaPort),
    })

    host, _ := os.Hostname()

    app := eureka.NewInstanceInfo(
        "customer-service",
        "customer-service",
        host,
        8082,
        30,
        false,
    )

    // Forzar valores correctos
    app.VipAddress = "customer-service"
    app.App = "CUSTOMER-SERVICE"
    app.Status = "UP"
    app.HomePageUrl = fmt.Sprintf("http://%s:%d/", host, 8082)
    app.StatusPageUrl = fmt.Sprintf("http://%s:%d/actuator/info", host, 8082)   
    app.HealthCheckUrl = fmt.Sprintf("http://%s:%d/actuator/health", host, 8082)

    app.InstanceID = fmt.Sprintf("%s:%d", "customer-service", 8082)
    app.Metadata = &eureka.MetaData{
        Map: map[string]string{
            "management.port": "8082",
        },
    }

    client.RegisterInstance("customer-service", app)
    fmt.Println("Customer Service registrado en Eureka")

    // Heartbeat loop
    go func() {
        time.Sleep(5 * time.Second)
        for {
            time.Sleep(25 * time.Second)
            fmt.Println("Enviando heartbeat a Eureka...")
            err := client.SendHeartbeat("customer-service", app.InstanceID)
            if err != nil {
                fmt.Println("Error enviando heartbeat a Eureka:", err)
            } else {
                fmt.Println("Heartbeat enviado correctamente")
            }
        }
    }()
}

