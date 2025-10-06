package main

import (
    "customer-service/config"
    "customer-service/controller"
    "customer-service/repository"
    "customer-service/service"

    "github.com/gin-gonic/gin"
)

func main() {
    db := config.InitDB()
    repo := repository.NewCustomerRepository(db)
    srv := service.NewCustomerService(repo)
    ctrl := controller.NewCustomerController(srv)

    r := gin.Default()
    ctrl.RegisterRoutes(r)

    // Registrar en Eureka
    go config.RegisterEureka()

    r.Run(":8082") // Puerto del microservicio
}
