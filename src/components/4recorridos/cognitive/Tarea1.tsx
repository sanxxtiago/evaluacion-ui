import React, { useEffect, useState } from 'react'
import useTimer from './hooks/useTimer.ts'
import useTracker from './hooks/useTracker.ts'
import useErrors from './hooks/useErrors.ts'
import { useNavigate, type Session } from 'react-router-dom'
import { readLS, writeLS } from './data/cognitiveStore.ts'


export default function Tarea1() {
    const [page, setPage] = useState<'inicio' | 'perfil' | 'ajustes'>('inicio')
    const timer = useTimer()
    const tracker = useTracker()
    const errors = useErrors()
    const navigate = useNavigate()


    useEffect(() => { timer.start(); tracker.registerStep('Entró Tarea1') }, [])


    useEffect(() => { if (page === 'perfil') { tracker.registerStep('Seleccionó Perfil'); setTimeout(() => finish({ success: true, message: 'Perfil encontrado' }), 600) } }, [page])


    function finish(result: unknown) {
        timer.stop()
        const session = {
            id: 's' + Date.now(),
            taskId: 't1',
            taskTitle: 'Encontrar Perfil',
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
            durationSec: timer.durationSec,
            steps: tracker.steps,
            errors: errors.errors,
            result
        }
        const prev = readLS<Session[]>('cw_sessions', [])
        writeLS('cw_sessions', [session, ...(prev || [])])
        navigate(`/recorridos/cognitivo/feedback/${session.id}`)
    }


    return (
        <div className="p-6 bg-white rounded-2xl shadow max-w-4xl">
            <h2 className="text-xl font-semibold">Tarea 1 — Encontrar Perfil</h2>
            <p className="text-sm text-slate-600 mt-1">Selecciona la opción <b>Perfil</b> en el menú.</p>


            <div className="mt-6 flex">
                <div className="w-56 bg-gray-100 p-3 rounded">
                    <button onClick={() => { setPage('inicio'); tracker.registerStep('Clic Inicio') }} className={`w-full text-left p-2 rounded ${page === 'inicio' ? 'bg-gray-200' : ''}`}>Inicio</button>
                    <button onClick={() => { setPage('perfil'); tracker.registerStep('Clic Perfil') }} className={`w-full text-left p-2 rounded mt-2 ${page === 'perfil' ? 'bg-blue-200' : ''}`}>Perfil</button>
                    <button onClick={() => { setPage('ajustes'); tracker.registerStep('Clic Ajustes') }} className={`w-full text-left p-2 rounded mt-2 ${page === 'ajustes' ? 'bg-gray-200' : ''}`}>Ajustes</button>
                </div>
                <div className="flex-1 p-4">
                    {page === 'inicio' && <div><h3 className="font-medium">Inicio</h3><p className="text-sm text-slate-600">Contenido de inicio.</p></div>}
                    {page === 'perfil' && <div><h3 className="font-medium text-green-600">Perfil</h3><p className="text-sm text-slate-600">Has llegado a Perfil.</p></div>}
                    {page === 'ajustes' && <div><h3 className="font-medium">Ajustes</h3><p className="text-sm text-slate-600">Opciones de configuración.</p></div>}
                </div>
            </div>


        </div>
    )
}