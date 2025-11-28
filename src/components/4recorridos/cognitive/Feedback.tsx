import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { readLS, writeLS } from './data/cognitiveStore'


export default function Feedback() {
    const { sessionId } = useParams()
    const navigate = useNavigate()
    const [difficulty, setDifficulty] = useState(3)
    const [comments, setComments] = useState('')


    function submit() {
        const fb = { id: 'f' + Date.now(), sessionId, difficulty, comments }
        const prev = readLS<string[]>('cw_feedbacks', [])
        writeLS('cw_feedbacks', [fb, ...(prev || [])])
        navigate('/recorridos/cognitivo/summary')
    }


    return (
        <div className="p-6 bg-white rounded-2xl shadow max-w-2xl">
            <h2 className="text-xl font-semibold">Feedback</h2>
            <p className="text-sm text-slate-600 mt-1">Valora la tarea y deja un comentario breve.</p>
            <div className="mt-4">
                <label className="block text-sm">Dificultad</label>
                <select value={difficulty} onChange={(e) => setDifficulty(Number(e.target.value))} className="p-2 border rounded mt-2">
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div className="mt-3">
                <label className="block text-sm">Comentarios</label>
                <textarea value={comments} onChange={(e) => setComments(e.target.value)} className="w-full p-2 border rounded mt-2" rows={4}></textarea>
            </div>
            <div className="mt-4"><button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button></div>
        </div>
    )
}