from fastapi import APIRouter, HTTPException
from app.models import Order

router = APIRouter()

@router.post("/createorder")
async def create_order(order: Order):
    existing = await Order.find_one(Order.orderID == order.orderID)
    if existing:
        raise HTTPException(status_code=400, detail="Order ID already exists")

    order.orderCreated = True
    await order.insert()
    return order

@router.put("/updateorderstatus")
async def update_order_status(orderID: str, status: str):
    order = await Order.find_one(Order.orderID == orderID)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status
    await order.save()
    return {"orderID": orderID, "status": status, "orderStatusUpdated": True}

@router.get("/findorderbycustomerid/{customerid}")
async def find_order_by_customerid(customerid: str):
    orders = await Order.find(Order.customerid == customerid).to_list()
    if not orders:
        raise HTTPException(status_code=404, detail="No orders for this customer")
    return orders

@router.get("/hello")
async def hello():
    return {"message": "Hello, World!"}
