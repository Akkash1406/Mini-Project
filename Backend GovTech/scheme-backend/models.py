from pydantic import BaseModel
from typing import Optional


class Scheme(BaseModel):
    id: str
    name: str
    shortName: str
    category: str
    ministry: str
    description: str
    eligibility: list[str]
    benefits: list[str]
    documents: list[str]
    applyLink: str
    tags: list[str]


class SchemeWithScore(Scheme):
    matchScore: int


class UserProfile(BaseModel):
    occupation: str
    annualIncome: str
    education: str
    category: str
    age: str
    gender: str
    requirement: str
    state: Optional[str] = ""
    name: Optional[str] = ""
