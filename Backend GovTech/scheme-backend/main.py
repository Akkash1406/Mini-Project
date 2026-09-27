from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import schemes, admin

app = FastAPI(
    title="Government Scheme Search API",
    description="Search and browse government schemes",
    version="1.0.0",
)

# Allow your frontend to call this API.
# Replace "*" with your actual frontend URL(s) before going to production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(schemes.router)
app.include_router(admin.router)


@app.get("/")
def root():
    return {"status": "ok", "message": "Government Scheme Search API is running"}
