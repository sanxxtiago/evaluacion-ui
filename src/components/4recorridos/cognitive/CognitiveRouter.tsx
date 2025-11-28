import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard.tsx'
import Tarea1 from './Tarea1.tsx'
import Tarea2 from './Tarea2.tsx'
import Tarea3 from './Tarea3.tsx'
import Feedback from './Feedback.tsx'
import Summary from './Summary.tsx'


export default function CognitiveRouter() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tarea1" element={<Tarea1 />} />
            <Route path="/tarea2" element={<Tarea2 />} />
            <Route path="/tarea3" element={<Tarea3 />} />
            <Route path="/feedback/:sessionId" element={<Feedback />} />
            <Route path="/summary" element={<Summary />} />
        </Routes>
    )
}