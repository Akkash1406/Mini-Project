from models import UserProfile


def score_schemes(profile: UserProfile, all_schemes: list[dict]) -> list[dict]:
    occ = profile.occupation.lower()
    req = profile.requirement.lower()
    try:
        income = int(profile.annualIncome)
    except (ValueError, TypeError):
        income = 0
    try:
        age = int(profile.age)
    except (ValueError, TypeError):
        age = 0
    cat = profile.category.lower()
    gender = profile.gender.lower()
    edu = profile.education.lower()

    scored = []
    for scheme in all_schemes:
        score = 0
        tags = scheme["tags"]

        # Occupation match
        if "student" in occ or "study" in occ:
            if "student" in tags or "education" in tags:
                score += 40
        if "farmer" in occ or "agriculture" in occ or "farming" in occ:
            if "farmer" in tags or "agriculture" in tags:
                score += 40
        if "business" in occ or "entrepreneur" in occ or "self" in occ:
            if "entrepreneur" in tags or "business" in tags or "msme" in tags:
                score += 40
        if "job" in occ or "unemployed" in occ or "labor" in occ or "labour" in occ:
            if "employment" in tags or "skill" in tags:
                score += 35
        if "retired" in occ or "senior" in occ or age >= 60:
            if "senior" in tags or "pension" in tags:
                score += 40

        # Requirement keyword match
        if "scholar" in req or "education" in req or "study" in req:
            if "student" in tags or "scholarship" in tags or "education" in tags:
                score += 25
        if "loan" in req or "business" in req or "startup" in req:
            if "loan" in tags or "business" in tags or "credit" in tags:
                score += 25
        if "skill" in req or "training" in req or "job" in req:
            if "skill" in tags or "employment" in tags or "training" in tags:
                score += 25
        if "house" in req or "home" in req or "shelter" in req:
            if "housing" in tags:
                score += 30
        if "insurance" in req or "accident" in req or "health" in req:
            if "insurance" in tags:
                score += 25
        if "pension" in req or "old age" in req or "retire" in req:
            if "pension" in tags or "senior" in tags:
                score += 30
        if "crop" in req or "farm" in req or "agriculture" in req or "subsid" in req:
            if "agriculture" in tags or "farmer" in tags:
                score += 30

        # Income-based boosting
        if income < 180000 or income == 0:
            if "bpl" in tags or "low income" in tags or scheme["category"] == "Insurance":
                score += 15

        # Category match
        if "obc" in cat and "obc" in tags:
            score += 20
        if "sc" in cat or "st" in cat:
            if "scholarship" in tags or "welfare" in tags:
                score += 15

        # Gender
        if gender in ("female", "woman"):
            if "women" in tags or "girl" in tags:
                score += 20

        # Age range
        if 18 <= age <= 30:
            if "youth" in tags or "student" in tags:
                score += 10
        if age >= 60:
            if "senior" in tags or "elderly" in tags:
                score += 20

        # Education
        if "below" in edu or "10th" in edu or "8th" in edu:
            if "skill" in tags or "unskilled" in tags:
                score += 10

        # Fallback: universal scheme boost
        if scheme["id"] == "pmsby":
            score += 5

        match_score = min(score, 98)
        if match_score > 0:
            scored.append({**scheme, "matchScore": match_score})

    scored.sort(key=lambda s: s["matchScore"], reverse=True)
    return scored[:6]
