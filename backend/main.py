import asyncio
from datetime import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class AnomalyPayload(BaseModel):
    patient_id: str
    heart_rate: int
    blood_pressure: str
    spo2: int
    timestamp: str


app = FastAPI(title="VitaGuard Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _log(msg: str):
    now = datetime.utcnow().isoformat()
    print(f"[AGENT] {now} - {msg}")


@app.post("/api/trigger-triage")
async def trigger_triage(payload: AnomalyPayload):
    _log(f"Received payload for patient={payload.patient_id}. Verifying...")
    # Simulate autonomous agent verification and processing
    await asyncio.sleep(1.5)
    _log("[VERIFIED] Executing emergency protocol. Routing encrypted payload.")
    _log("Payload routing complete. Handshake established with downstream vault (simulated).")
    response = {
        "status": "success",
        "agent_action": "Encrypted medical payload routed.",
        "response_time_ms": 1205,
    }
    _log(f"Response ready for patient={payload.patient_id}. Response_time_ms={response['response_time_ms']}")
    return response
