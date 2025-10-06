from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Report(BaseModel):
    id: int
    title: str
    category: str
    description: str
    status: str

reports: List[Report] = []

@app.get("/reports")
def list_reports():
    return reports

@app.post("/reports")
def create_report(r: Report):
    reports.append(r)
    return r

@app.put("/reports/{report_id}")
def update_report(report_id: int, status: str):
    for r in reports:
        if r.id == report_id:
            r.status = status
            return r
    return {"error":"not found"}
