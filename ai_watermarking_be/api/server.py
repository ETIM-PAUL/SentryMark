from fastapi import FastAPI, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from watermark.watermark import (
    verify_watermark,
    string_to_binary,
    embed_watermark as embed_watermark_image,
    AlreadyWatermarkedError,
)
import requests
import json


class ImageSchema(BaseModel):
    base64_image: str
    watermark_hash: str


app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    """
    Health check endpoint
    
    Response:
    - status: "ok"
    - message: "Server is running"
    """
    return {
        "status": "ok",
        "message": "Server is running"
    }

@app.post("/watermark-image")
async def embed_watermark_endpoint(
    image: ImageSchema,
):
    base64_image = image.base64_image
    watermark_hash = image.watermark_hash

    try:
        embedded_image = embed_watermark_image(base64_image, watermark_hash)
    except AlreadyWatermarkedError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )

    if embedded_image:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={
                "success": True,
                "message": "Image embedded successfully",
                "embedded_image": embedded_image,
            },
        )
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image embedding failed",
        )

@app.post("/verify-watermark")
async def verify_watermark_endpoint(
  image: ImageSchema
):
    base64_image = image.base64_image
    watermark_hash = image.watermark_hash
    verified = verify_watermark(base64_image, watermark_hash)
    if verified:
        return JSONResponse(status_code=status.HTTP_200_OK, content={"verified": verified, "success": True, "message": "Image verified successfully"})
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Image verification failed")



@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Image Watermarking Backend API",
        "version": "1.0.0",
        "status": "running"
    }