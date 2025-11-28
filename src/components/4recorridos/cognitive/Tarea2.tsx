import React, { useEffect, useState } from 'react'
import useTimer from './hooks/useTimer'
import useTracker from './hooks/useTracker'
import useErrors from './hooks/useErrors'
import { useNavigate } from 'react-router-dom'
import { readLS, writeLS } from './data/cognitiveStore'


export default function Tarea2() {
    const [checked, setChecked] = useState(false)
    const timer = useTimer(); const tracker = useTracker(); const errors = useErrors(); const navigate = useNavigate()


    useEffect(() => { timer.start(); tracker.registerStep('Entró Tarea2') }, [])


    function finish() {
        tracker.registerStep('Guardó preferencia: ' + (checked ? 'activo' : 'inactivo'))
        timer.stop()
        const session = { id: 's' + Date.now(), taskId: 't2', taskTitle: 'Cambiar Preferencia', startedAt: new Date().toISOString(), finishedAt: new Date().toISOString(), durationSec: timer.durationSec, steps: tracker.steps, errors: errors.errors }
        const prev = readLS<string[]>('cw_sessions', [])
        writeLS('cw_sessions', [session, ...(prev || [])])
        navigate(`/recorridos/cognitivo/feedback/${session.id}`)
    }


    return (
        <div className="p-6 bg-white rounded-2xl shadow max-w-2xl">
            <h2 className="text-xl font-semibold">Tarea 2 — Cambiar Preferencia</h2>
            <p className="text-sm text-slate-600 mt-1">Activa o desactiva la preferencia y guarda.</p>


            <div className="mt-4">
                <label className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                    <input type="checkbox" checked={checked} onChange={e => { setChecked(e.target.checked); tracker.registerStep('Toggle notificaciones ' + (e.target as HTMLInputElement).checked) }} />
                    <span>Activar notificaciones</span>
                </label>
            </div>


            <div className="mt-4 flex gap-2">
                <button onClick={finish} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
        </div>
    )
}