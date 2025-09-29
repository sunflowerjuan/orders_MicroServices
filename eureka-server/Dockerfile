# Imagen base con Java 21
FROM openjdk:21-jdk-slim

# Argumento para recibir el .jar
ARG JAR_FILE=target/*.jar

# Copiar el jar al contenedor
COPY ${JAR_FILE} app.jar

# Exponer el puerto de Eureka
EXPOSE 8761

# Ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "/app.jar"]
