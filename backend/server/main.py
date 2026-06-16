from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv      
from server.routers import api_router
load_dotenv()

app = FastAPI(title="Bloom API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(api_router)

@app.get("/health")
async def health_check():
    return {"status": "healthy"}