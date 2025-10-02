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
  curl -X POST http://obama.localhost/login/createuser \
  -H "Content-Type: application/json" \
  -d '{
    "username": "majo",
    "password": "181818"
  }'
  ```

- Autenticar un usuario:

  ```bash
  curl -X POST http://obama.localhost/login/authuser \
  -H "Content-Type: application/json" \
  -d '{
    "username": "majo",
    "password": "181818"
  }'
  ```

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

MIT
