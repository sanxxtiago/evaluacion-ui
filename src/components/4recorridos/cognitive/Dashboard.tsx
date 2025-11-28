import React from 'react'
import { Link } from 'react-router-dom'


const TASKS = [
    { id: 't1', title: 'Tarea 1: Encontrar Perfil', desc: "Navega el menú simulado y selecciona 'Perfil'" },
    { id: 't2', title: 'Tarea 2: Cambiar Preferencia', desc: 'Entra a Ajustes y modifica una preferencia' },
    { id: 't3', title: 'Tarea 3: Enviar Mensaje', desc: 'Completa el formulario y envía un mensaje' }
]


export default function Dashboard() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Recorrido Cognitivo — Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {TASKS.map(t => (
                    <div key={t.id} className="bg-white p-5 rounded-2xl shadow">
                        <h2 className="font-semibold">{t.title}</h2>
                        <p className="text-sm text-slate-600 mt-2">{t.desc}</p>
                        <div className="mt-4 flex gap-2">
                            <Link to={`/recorridos/cognitivo/${t.id}`} className="px-4 py-2 bg-blue-600 text-white rounded">Realizar tarea</Link>
                            <Link to={`/recorridos/cognitivo/${t.id}`} className="px-4 py-2 border rounded">Ver</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}