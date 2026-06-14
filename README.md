# VitaGuard - Edge AI Biometric Triage

Project VitaGuard is a hackathon MVP demonstrating a two-layer edge triage system for biometric anomalies. It pairs an on-device TRM detector (simulated in the frontend) with an autonomous agent (FastAPI) that accepts critical payloads and executes emergency routing logic (simulated).

Repository layout
- /frontend — Vite + React + Tailwind UI (simulated Edge TRM Detector + dashboard)
- /backend — FastAPI autonomous agent (Layer 2) listening for triage triggers

Architecture
- Layer 1 — Edge TRM Detector: Lightweight browser-based simulation that monitors vitals and triggers anomalies. This represents the low-latency edge process.
- Layer 2 — Autonomous FastAPI Agent: An independent HTTP agent that receives validated anomaly payloads and performs higher-trust routing/triage actions. The agent intentionally logs rich, professional messages to emulate offline/air-gapped processes.

Quickstart (Judges)

1) Backend — Create a Python virtual environment, install, and run the agent:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --port 8000
```

2) Frontend — Install node deps and run the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```

Open the frontend in the browser (Vite prints the local URL, defaults to http://localhost:5173). Use the dashboard's "Trigger Anomaly" button to simulate an anomaly — this will POST a mock `AnomalyPayload` to the FastAPI agent at `http://localhost:8000/api/trigger-triage` and append the agent response to the UI terminal.

Notes for judges
- Minimal: This prototype focuses on clear separation of responsibilities, strong logging for auditability, and a compact, hackathon-friendly stack.
- Security: The demo simulates encrypted routing and secure handling in the agent's logs and responses; do not treat this as production-ready crypto.
- Extension ideas: integrate actual edge model inference, signed payloads, message queues, or offline sync to a secure vault.

Contact
For questions about the prototype, local runs, or extending the demo, open an issue or contact the project author.
