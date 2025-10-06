# Etapa 1: build
FROM golang:1.23-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

# Copiar mod primero (para aprovechar cache de dependencias)
COPY go.mod ./
RUN go mod download

# Copiar el resto del código
COPY . .

# Asegurar go.sum actualizado
RUN go mod tidy

# Compilar binario
RUN go build -o customer-service ./cmd

# Etapa 2: runtime
FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/customer-service .

CMD ["./customer-service"]
