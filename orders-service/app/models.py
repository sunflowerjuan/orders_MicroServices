from beanie import Document
from pydantic import Field
from typing import Optional

class Order(Document):
    customerid: str = Field(...)
    orderID: str = Field(...)
    status: str = Field(...)
    orderCreated: bool = Field(default=False)

    class Settings:
        name = "orders"  # Nombre de la colección en MongoDB

    class Config:
        schema_extra = {
            "example": {
                "customerid": "C001",
                "orderID": "O001",
                "status": "PENDING",
                "orderCreated": True
            }
        }
