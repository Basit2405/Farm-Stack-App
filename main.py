from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Item
from database import db
import stripe
import os
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

load_dotenv()
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "FastAPI is running!"}

@app.get("/items")
async def get_items():
    items = []
    async for item in db["items"].find():
        item["_id"] = str(item["_id"])
        items.append(item)
    return items

@app.post("/items")
async def create_item(item: Item):
    result = await db["items"].insert_one(item.dict())
    return {"id": str(result.inserted_id), "item": item}

@app.post("/create-checkout-session")
async def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "unit_amount": 500,
                    "product_data": {
                        "name": "Starter Plan",
                    },
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )
        return JSONResponse({"url": session.url})
    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)