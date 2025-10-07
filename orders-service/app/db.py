import motor.motor_asyncio
from beanie import init_beanie
from app.models import Order
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongo-db:27017/order_db")

async def init_db():
    client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URI)
    db = client.get_default_database()
    await init_beanie(database=db, document_models=[Order])
