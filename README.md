#  VitaGuard: Edge AI Biometric Triage & Autonomous Agent

Project VitaGuard is a functional Minimum Viable Product (MVP) developed for the FAR AWAY 2026 Hackathon (Agentic & Autonomous Systems Track).

It demonstrates a two-layer edge computing architecture designed to autonomously monitor biometric telemetry, detect anomalies in offline environments, and orchestrate emergency triage without relying on cloud connectivity.

🧠 The Architecture & Why We Use TRM

Traditional "always-on" biometric AI models drain wearable batteries rapidly, while cloud-dependent models fail in remote or emergency situations. VitaGuard solves this by splitting the architecture into two distinct layers:

Layer 1: The Edge TRM Detector (The "Think" Phase)

At the core of our theoretical hardware implementation is an Adaptive Recursive Transformer (TRM).

Dynamic Halting: For 99% of a user's day (when vitals are normal), the TRM uses dynamic halting to stop processing early in the neural network layers. This reduces compute load by 60-70%, drastically saving battery life.

Deep Verification: When anomalous data (e.g., a sudden drop in SpO2) is detected, the model engages its full recursive depth to verify the emergency, eliminating false positives locally.

Layer 2: The Autonomous Agent (The "Decide & Act" Phase)

Once Layer 1 confirms a critical anomaly, it triggers our independent FastAPI Autonomous Agent.

This agent operates in the background (simulated as an air-gapped or localized process).

It securely packages the encrypted payload, performs context checks, and autonomously routes the data to emergency endpoints in under 2 seconds.

🌟 Multi-Purpose Versatility & Custom Training

VitaGuard is not limited to generic medical thresholds. Because the core system utilizes an AI Health Memory concept, the TRM can be custom-trained on an individual's personal physiological baseline.

This multi-purpose framework makes VitaGuard ideal for:

Elderly Care: Personalized baseline learning prevents false alarms for individuals with naturally irregular vitals.

Space & Aerospace: The dynamic halting TRM architecture is perfectly suited for low-power orbital hardware or spacesuit telemetry monitoring.

Disaster Zones: 100% offline edge processing ensures reliable triage data when cellular infrastructure is destroyed.

📂 Repository Structure

/frontend — Vite + React + Tailwind UI. This simulates the Edge TRM Detector running on a local terminal, displaying continuous biometric data and the compute load.

/backend — Python FastAPI. This acts as the Layer 2 Autonomous Agent, listening for triage triggers and executing simulated routing logic.

🚀 Quickstart Guide for Judges

To test the dynamic halting simulation and the autonomous agent routing, run both the backend and frontend concurrently locally.

1. Start the Backend Agent (Layer 2)

Open your terminal and run the following commands to initialize the FastAPI agent:

# Create and activate a virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate

# Install requirements
pip install -r backend/requirements.txt

# Run the agent
uvicorn backend.main:app --reload --port 8000


Note: Ensure the backend terminal remains visible to view the autonomous agent's simulated offline routing logs.

2. Start the Frontend Edge Terminal (Layer 1)

Open a second terminal window and run:

cd frontend
npm install
npm run dev


3. Execute the Demo

Open the frontend application in your browser (typically http://localhost:5173).

Observe the baseline telemetry and the "Compute Low" status (simulating Dynamic Halting).

Click "Trigger Anomaly".

Watch the magic: The frontend compute load will spike to simulate full recursive verification. The UI will instantly POST a mock AnomalyPayload to the FastAPI backend. Check your backend terminal to see the Autonomous Agent catch the payload, verify it, and execute the emergency routing protocol in real-time.

🔒 Notes on the MVP Scope

Security: The demo simulates encrypted routing and secure handling in the agent's logs and responses; do not treat this as production-ready cryptography.

Future Scope: Future iterations will integrate actual on-device PyTorch model inference, WebRTC for local mesh-network alerts, and offline sync to a secure SQLite vault.