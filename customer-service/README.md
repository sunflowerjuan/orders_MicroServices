POST DE PRUEBA

```bash
curl -X POST http://obama.localhost/customers/createcustomer \
  -H "Content-Type: application/json" \
  -d '{
    "document": "123456",
    "firstname": "Juan",
    "lastname": "Perez",
    "address": "Calle 123",
    "phone": "3001234567",
    "email": "juan@example.com"
  }'
```

POST DE PRUEBA

```bash
curl -X PUT http://localhost:8082/updatecustomer \
  -H "Content-Type: application/json" \
  -d '{
  "document": "123456",
  "firstname": "Juanito",
  "lastname": "Perez",
  "address": "Calle 456",
  "phone": "3109876543",
  "email": "juanito@example.com"
  }'
```
