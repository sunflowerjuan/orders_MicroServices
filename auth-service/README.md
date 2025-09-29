# Auth Service

Este microservicio gestiona la autenticación y autorización de usuarios en el sistema de pedidos.

## Características

- Registro y login de usuarios
- Protección de rutas mediante middleware
- Integración con otros microservicios

## Endpoints principales

- `POST /register`: Registro de usuario
- `POST /login`: Autenticación de usuario

## Test

- Crear un usuario:

  ```bash
  curl -X POST http://localhost:8080/login/createuser \
  -H "Content-Type: application/json" \
  -d '{
    "customerid": "juan123",
    "password": "secreto"
  }'
  ```

- Autenticar un usuario:

  ```bash
  curl -X POST http://localhost:8080/login/authuser \
  -H "Content-Type: application/json" \
  -d '{
    "customerid": "juan123",
    "password": "secreto"
  }'

  ```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

MIT
