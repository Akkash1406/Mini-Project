import json
from pathlib import Path
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from models import Scheme, UserProfile, SchemeWithScore
from recommendations import score_schemes

router = APIRouter(prefix="/schemes", tags=["schemes"])

DATA_PATH = Path(__file__).parent.parent / "data" / "schemes.json"

with open(DATA_PATH, "r", encoding="utf-8") as f:
    SCHEMES: list[dict] = json.load(f)


@router.get("", response_model=list[Scheme])
def list_schemes(
    category: Optional[str] = Query(None),
    q: Optional[str] = Query(None, description="Search keyword across name/description/tags"),
):
    results = SCHEMES

    if category:
        results = [s for s in results if s["category"].lower() == category.lower()]

    if q:
        q_lower = q.lower()
        results = [
            s for s in results
            if q_lower in s["name"].lower()
            or q_lower in s["description"].lower()
            or any(q_lower in t.lower() for t in s["tags"])
        ]

    return results


@router.get("/categories")
def list_categories():
    return {"categories": sorted(set(s["category"] for s in SCHEMES))}


@router.get("/{scheme_id}", response_model=Scheme)
def get_scheme(scheme_id: str):
    for s in SCHEMES:
        if s["id"] == scheme_id:
            return s
    raise HTTPException(status_code=404, detail="Scheme not found")


@router.post("/recommendations", response_model=list[SchemeWithScore])
def get_recommendations(profile: UserProfile):
    return score_schemes(profile, SCHEMES)
