from fastapi import FastAPI
from app.routes import router
from app.db import init_db
from app.eureka_client import start_eureka_registration
import threading
import uvicorn

app = FastAPI(title="Order Service", version="1.0.0")
app.include_router(router)

def run_eureka():
    start_eureka_registration(
        app_name="order-service",
        eureka_host="eureka-server",
        eureka_port=8761,
        instance_port=8083
    )

@app.on_event("startup")
async def startup_event():
    await init_db()
    threading.Thread(
        target=start_eureka_registration,
        args=("order-service", "eureka-server", 8761, 8083, "order-service"),
        daemon=True
    ).start()


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8083)
