# Imagen base con JDK
FROM openjdk:21-jdk-slim

# Directorio de la app
WORKDIR /app

# Copiar el JAR generado
COPY target/cloud-gateway-0.0.1-SNAPSHOT.jar app.jar

# Exponer el puerto del gateway
EXPOSE 8080

# Comando de arranque
ENTRYPOINT ["java", "-jar", "app.jar"]
