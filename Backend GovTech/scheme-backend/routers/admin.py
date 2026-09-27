import os
from fastapi import APIRouter, Header, HTTPException, Query
from dotenv import load_dotenv

from supabase_client import supabase_admin

load_dotenv()

router = APIRouter(prefix="/admin", tags=["admin"])

ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD")


def verify_admin(x_admin_password: str = Header(...)):
    if not ADMIN_PASSWORD or x_admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail="Invalid admin password")


@router.get("/lookup")
def lookup_user(
    query: str = Query(..., description="Name or email to search for"),
    x_admin_password: str = Header(...),
):
    verify_admin(x_admin_password)

    # Search profiles by full_name (case-insensitive partial match)
    profiles_resp = (
        supabase_admin.table("user_profiles")
        .select("*")
        .ilike("full_name", f"%{query}%")
        .execute()
    )
    matching_profiles = profiles_resp.data or []

    if not matching_profiles:
        raise HTTPException(status_code=404, detail="No matching user found")

    results = []
    for profile in matching_profiles:
        user_id = profile.get("id")

        # Get this user's auth info (email) via Supabase admin API
        email = None
        try:
            auth_user = supabase_admin.auth.admin.get_user_by_id(user_id)
            email = auth_user.user.email if auth_user and auth_user.user else None
        except Exception:
            pass

        # Get their search history, most recent first
        history_resp = (
            supabase_admin.table("search_history")
            .select("*")
            .eq("user_id", user_id)
            .order("created_at", desc=True)
            .execute()
        )

        results.append({
            "user_id": user_id,
            "email": email,
            "profile": profile,          # never includes password - Supabase Auth stores that separately, inaccessible here
            "search_history": history_resp.data or [],
        })

    return {"results": results}
