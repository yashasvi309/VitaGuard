import React, { useEffect, useState, useRef } from 'react'

function Terminal({logs}){
  return (
    <div className="bg-black/70 text-green-300 font-mono p-4 rounded h-48 overflow-auto text-sm">
      {logs.map((l, i) => (
        <div key={i} className="whitespace-pre-wrap">{l}</div>
      ))}
    </div>
  )
}

export default function App(){
  const [hr, setHr] = useState(72)
  const [bp, setBp] = useState('120/80')
  const [spo2, setSpo2] = useState(98)
  const [compute, setCompute] = useState(12)
  const [anomaly, setAnomaly] = useState(false)
  const [logs, setLogs] = useState([`[SYSTEM] VitaGuard initialized. Baseline monitoring active.`])
  const logsRef = useRef(logs)
  logsRef.current = logs

  useEffect(()=>{
    const id = setInterval(()=>{
      if(!anomaly){
        setHr(h => Math.max(55, Math.min(95, h + Math.round((Math.random()-0.5)*4))))
        setBp('120/80')
        setSpo2(s => Math.max(95, Math.min(100, s + Math.round((Math.random()-0.5)*1))))
        setCompute(c => Math.max(6, Math.min(18, Math.round(c + (Math.random()-0.5)*4))))
      } else {
        // drifting values under anomaly
        setHr(140)
        setBp('180/120')
        setSpo2(76)
        setCompute(98)
      }
    }, 900)
    return ()=> clearInterval(id)
  }, [anomaly])

  function pushLog(line){
    setLogs(l => [...l, `[${new Date().toISOString()}] ${line}`].slice(-200))
  }

  async function triggerAnomaly(){
    setAnomaly(true)
    pushLog('[ALERT] Anomaly Detected. Engaging Layer 2 Agent...')
    const payload = {
      patient_id: 'pt-001',
      heart_rate: hr,
      blood_pressure: bp,
      spo2: spo2,
      timestamp: new Date().toISOString(),
    }
    try{
      const res = await fetch('http://localhost:8000/api/trigger-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      pushLog(`[AGENT RESPONSE] ${data.agent_action} (status=${data.status})`)
    }catch(err){
      pushLog(`[ERROR] Failed to reach agent: ${err.message}`)
    }
  }

  function normalBaseline(){
    setAnomaly(false)
    pushLog('[SYSTEM] Simulated normal baseline engaged.')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-slate-200 font-mono p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-lg ring-1 ring-slate-700">
          <h1 className="text-2xl text-cyan-400 mb-4">VitaGuard — Edge AI Triage Dashboard</h1>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className={`p-4 rounded ${anomaly? 'bg-red-900 text-red-300': 'bg-black/50'} `}>
              <div className="text-sm text-slate-400">Heart Rate</div>
              <div className="text-3xl">{hr} bpm</div>
            </div>
            <div className={`p-4 rounded ${anomaly? 'bg-red-900 text-red-300': 'bg-black/50'} `}>
              <div className="text-sm text-slate-400">Blood Pressure</div>
              <div className="text-3xl">{bp}</div>
            </div>
            <div className={`p-4 rounded ${anomaly? 'bg-red-900 text-red-300': 'bg-black/50'} `}>
              <div className="text-sm text-slate-400">SpO2</div>
              <div className="text-3xl">{spo2}%</div>
            </div>
          </div>

          <div className="mb-4 p-4 rounded bg-black/40">
            <div className="text-sm text-slate-400">Compute Panel</div>
            <div className="text-xl text-green-300">Baseline Stable: Dynamic Halting Active (Compute {compute}%{compute>90? ' — High':' — Low'})</div>
          </div>

          <div className="mb-4">
            <div className="text-sm text-slate-400 mb-2">Terminal</div>
            <Terminal logs={logs} />
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={normalBaseline} className="px-4 py-2 bg-green-700 hover:bg-green-600 rounded">Simulate Normal Baseline</button>
            <button onClick={triggerAnomaly} className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded">Trigger Anomaly</button>
          </div>
        </div>

        <aside className="col-span-1 p-6 rounded-lg bg-gradient-to-br from-slate-900 to-slate-800 ring-1 ring-slate-700">
          <h2 className="text-cyan-400 mb-4">System Summary</h2>
          <ul className="text-sm space-y-2 text-slate-300">
            <li>Mode: Edge TRM Detector (Layer 1)</li>
            <li>Agent: Autonomous FastAPI (Layer 2)</li>
            <li>Connectivity: HTTP (simulated)</li>
            <li>Security: Simulated encrypted routing</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
