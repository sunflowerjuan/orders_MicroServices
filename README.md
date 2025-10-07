# SISTEMA DE PEDIDOS BASADO EN PATRON ARQUITECTONICO BAJO MICROSEVICIOS

Este proyecto implementa un sistema académico de pedidos basado en una arquitectura de microservicios.
Cada módulo se ejecuta en su propio contenedor y se comunica a través de un API Gateway registrado en Eureka Server.

Los microservicios son:

1. Auth Service (login-service) → Maneja autenticación y usuarios.

2. Customer Service (customer-service) → Administra los datos de los clientes.

3. Order Service (order-service) → Gestiona la creación y estado de los pedidos.

Cada servicio usa su propia base de datos:
| Microservicio | Base de Datos | Motor |
| ---------------- | --------------------- | ---------- |
| Auth Service | login_db | MySQL |
| Customer Service | CustomerDB | PostgreSQL |
| Order Service | MONGO_INITDB_DATABASE | MongoDB |

Y como punto central:

- Eureka Server: servicio de registro y descubrimiento (Spring Boot).

- Cloud Gateway: balanceador y router API (Spring Cloud Gateway).

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

| Requisito          | Versión recomendada | Descripción                                 |
| ------------------ | ------------------- | ------------------------------------------- |
| **Java JDK**       | 17 o superior       | Para compilar los proyectos de Spring Boot  |
| **Maven**          | 3.8+                | Para construir los JAR de gateway y eureka  |
| **Docker**         | 24+                 | Para ejecutar los contenedores              |
| **Docker Compose** | 2.x                 | Para orquestar los servicios                |
| **Node.js + npm**  | Node 18+            | Para levantar el frontend (orders_frontend) |

## Estructura

```
project-root/
 ┣ api-gateway/
 ┃ ┣ eureka-server/
 ┃ ┣ cloud-gateway/
 ┣ auth-service/
 ┣ customer-service/
 ┣ orders-service/
 ┣ orders_frontend/
 ┣ docker-compose.yml
 ┗ .env

```

## Pasos para ejecutar el sistema

1. Generar los JAR de los proyectos Java

Ve al directorio raíz de cada subproyecto dentro de [api-gateway](api-gateway)

- eureka-server:

```bash
cd api-gateway/eureka-server
mvn clean package -DskipTests
```

- cloud-gateway:

```bash
cd ../cloud-gateway
mvn clean package -DskipTests
```

Estos JARs son necesarios para construir las imágenes Docker correspondientes.

2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto

```properties
# Claves generales
KEY=miclave123

# --- MySQL ---
MYSQL_ROOT_PASSWORD=root
MYSQL_USER=loginuser
MYSQL_PASSWORD=loginpass
MYSQL_PORT=3307

# --- PostgreSQL ---
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# --- Mongo ---
MONGO_INITDB_ROOT_USERNAME=mongo
MONGO_INITDB_ROOT_PASSWORD=mongo
MONGO_INITDB_DATABASE=ordersDB
```

3. Levantar los contenedores

El docker-compose.yml está dividido por perfiles para controlar qué se levanta:

- Levantar el Gateway y Eureka

  ```bash
  docker compose --profile gateway up -d --build
  ```

- Levantar Levantar los microservicios

  ```bash
  docker compose --profile services up -d --build
  ```

4. Ejecutar el frontend

Finalmente, levanta el frontend desde la carpeta orders_frontend:

```bash
cd orders_frontend
npm install
npm start
```

## Flujo de comunicación

1. El frontend se comunica con api-gateway (http://obama.localhost)

2. El gateway enruta las peticiones a los microservicios registrados en Eureka.

3. Cada microservicio gestiona sus propios datos en su base correspondiente.
