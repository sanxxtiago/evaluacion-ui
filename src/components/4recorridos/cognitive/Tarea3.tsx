import React, { useEffect, useState } from 'react'
import useTimer from './hooks/useTimer'
import useTracker from './hooks/useTracker'
import useErrors from './hooks/useErrors'
import { useNavigate } from 'react-router-dom'
import { readLS, writeLS } from './data/cognitiveStore'


export default function Tarea3() {
    const [to, setTo] = useState('');
    const [body, setBody] = useState('')
    const timer = useTimer();
    const tracker = useTracker();
    const errors = useErrors();
    const navigate = useNavigate()


    useEffect(() => { timer.start(); tracker.registerStep('Entró Tarea3') }, [])


    function send() {
        tracker.registerStep('Intentó enviar mensaje')
        if (!to || !body) { errors.registerError('Mensaje incompleto'); return }
        timer.stop()
        const session = { id: 's' + Date.now(), taskId: 't3', taskTitle: 'Enviar Mensaje', startedAt: new Date().toISOString(), finishedAt: new Date().toISOString(), durationSec: timer.durationSec, steps: tracker.steps, errors: errors.errors, result: { to, body } }
        const prev = readLS<string[]>('cw_sessions', [])
        writeLS('cw_sessions', [session, ...(prev || [])])
        navigate(`/recorridos/cognitivo/feedback/${session.id}`)
    }


    return (
        <div className="p-6 bg-white rounded-2xl shadow max-w-2xl">
            <h2 className="text-xl font-semibold">Tarea 3 — Enviar Mensaje</h2>
            <p className="text-sm text-slate-600 mt-1">Rellena los campos y pulsa Enviar.</p>


            <div className="mt-4 flex flex-col gap-3">
                <input value={to} onChange={e => { setTo(e.target.value); tracker.registerStep('Input destinatario') }} placeholder="Destinatario" className="p-2 border rounded" />
                <textarea value={body} onChange={e => { setBody(e.target.value); tracker.registerStep('Input cuerpo') }} placeholder="Mensaje" className="p-2 border rounded h-28" />
                <div className="mt-2 flex gap-2"><button onClick={send} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button></div>
            </div>
        </div>
    )
}