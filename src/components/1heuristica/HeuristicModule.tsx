/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

// -------------------------
// Types & LocalStorage utils
// -------------------------
export type HeuristicKey =
    | 'visibility'
    | 'match'
    | 'control'
    | 'consistency'
    | 'error_prevention'
    | 'recognition'
    | 'flexibility'
    | 'aesthetic'
    | 'error_recovery'
    | 'help_doc';

export type ProblemRecord = {
    id: string;
    screenId: string;
    heuristic: HeuristicKey;
    detail: string;
    severity: 'Baja' | 'Media' | 'Alta' | 'Crítica';
    timestamp: string;
};

function readLS<T>(key: string, fallback: T): T {
    try {
        const v = localStorage.getItem(key);
        return v ? (JSON.parse(v) as T) : fallback;
    } catch (e) {
        return fallback;
    }
}

function writeLS(key: string, value: unknown) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        // ignore
    }
}

// -------------------------
// Constants
// -------------------------
const HEURISTICS: { key: HeuristicKey; label: string; desc: string }[] = [
    { key: 'visibility', label: 'Visibilidad del estado del sistema', desc: 'El sistema debe mantener informados a los usuarios sobre lo que ocurre.' },
    { key: 'match', label: 'Relación con el mundo real', desc: 'El sistema debe hablar el lenguaje del usuario.' },
    { key: 'control', label: 'Control y libertad del usuario', desc: 'Permitir deshacer/rehacer acciones y cancelar.' },
    { key: 'consistency', label: 'Consistencia y estándares', desc: 'Seguir convenciones y mantener consistencia.' },
    { key: 'error_prevention', label: 'Prevención de errores', desc: 'Diseñar para prevenir problemas antes de que ocurran.' },
    { key: 'recognition', label: 'Reconocer mejor que recordar', desc: 'Minimizar la carga de memoria.' },
    { key: 'flexibility', label: 'Flexibilidad y eficiencia de uso', desc: 'Permitir atajos para usuarios expertos.' },
    { key: 'aesthetic', label: 'Diseño estético y minimalista', desc: 'Evitar información irrelevante.' },
    { key: 'error_recovery', label: 'Ayuda para reconocer y corregir errores', desc: 'Los mensajes deben ser claros y ayudar a recuperarse.' },
    { key: 'help_doc', label: 'Ayuda y documentación', desc: 'Facilitar la documentación y ayuda contextual.' }
];

const STORAGE_KEY = 'hw_problems';

// -------------------------
// Small Mockup Components (interactive but minimal)
// -------------------------
function MockupScreen1({ onReport }: { onReport?: (hint: string) => void }) {
    // Simple interactive mock: a login-like form with an intentionally ambiguous label
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div className="bg-white border rounded p-4 shadow">
            <h3 className="font-semibold mb-2">Mockup: Perfil / Inicio</h3>
            <div className="mb-3 text-sm text-slate-600">Se muestran elementos con problemas intencionados (por ejemplo etiquetas confusas).</div>

            <div className="space-y-3">
                <label className="block text-xs text-slate-600">Usuario (se muestra como "ID")</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" placeholder="ID o correo" />

                <label className="block text-xs text-slate-600">Clave</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" className="w-full p-2 border rounded" />

                <div className="flex gap-2">
                    <button onClick={() => onReport?.('Botón de inicio no claro')} className="px-3 py-2 bg-blue-600 text-white rounded">Entrar</button>
                    <button onClick={() => onReport?.('Acción de ayuda no accesible')} className="px-3 py-2 border rounded">Ayuda</button>
                </div>
            </div>
        </div>
    );
}

function MockupScreen2({ onReport }: { onReport?: (hint: string) => void }) {
    // Another simple mock: settings with poor contrast and duplicate options
    const [notif, setNotif] = useState(false);
    return (
        <div className="bg-white border rounded p-4 shadow">
            <h3 className="font-semibold mb-2">Mockup: Ajustes</h3>
            <div className="mb-3 text-sm text-slate-600">Elementos visuales que pueden violar heurísticas (color, agrupación).</div>
            <label className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                <input type="checkbox" checked={notif} onChange={(e) => setNotif(e.target.checked)} />
                <span className="text-sm">Recibir notificaciones</span>
                <button onClick={() => onReport?.('Etiqueta de notificaciones poco clara')} className="ml-auto text-xs text-blue-600">Reportar problema</button>
            </label>
        </div>
    );
}

// -------------------------
// Pages
// -------------------------
function IntroPage() {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Evaluación Heurística — Introducción</h1>
            <p className="text-sm text-slate-600 mb-4">Selecciona una heurística para revisar o ve directo a evaluar la interfaz simulada.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {HEURISTICS.map((h) => (
                    <div key={h.key} className="bg-white p-4 rounded shadow">
                        <div className="font-semibold">{h.label}</div>
                        <div className="text-sm text-slate-500">{h.desc}</div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex gap-2">
                <Link to="/heuristics/evaluate" className="px-4 py-2 bg-blue-600 text-white rounded">Ir a evaluar</Link>
                <Link to="/heuristics/summary" className="px-4 py-2 border rounded">Ver resumen</Link>
            </div>
        </div>
    );
}

function EvaluatePage() {
    const navigate = useNavigate();
    const [screenId, setScreenId] = useState('screen1');
    const [heuristic, setHeuristic] = useState<HeuristicKey>('visibility');
    const [detail, setDetail] = useState('');
    const [severity, setSeverity] = useState<'Baja' | 'Media' | 'Alta' | 'Crítica'>('Media');
    const [hint, setHint] = useState<string | undefined>(undefined);

    useEffect(() => setHint(undefined), [screenId]);

    function reportProblem() {
        if (!detail.trim()) return alert('Describe brevemente el problema.');
        const item: ProblemRecord = {
            id: `p${Date.now()}`,
            screenId,
            heuristic,
            detail: detail.trim(),
            severity,
            timestamp: new Date().toISOString()
        };
        const prev = readLS<ProblemRecord[]>(STORAGE_KEY, []);
        writeLS(STORAGE_KEY, [item, ...(prev || [])]);
        navigate('/heuristics/summary');
    }

    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                    <label className="text-sm">Seleccionar mockup:</label>
                    <select value={screenId} onChange={(e) => setScreenId(e.target.value)} className="p-2 border rounded">
                        <option value="screen1">Perfil / Inicio</option>
                        <option value="screen2">Ajustes</option>
                    </select>
                </div>

                <div>
                    {screenId === 'screen1' && <MockupScreen1 onReport={(h) => setHint(h)} />}
                    {screenId === 'screen2' && <MockupScreen2 onReport={(h) => setHint(h)} />}
                </div>

                <div className="mt-4 bg-white p-4 rounded shadow">
                    <div className="text-sm text-slate-600">Sugerencia: {hint ?? 'Interactúa con la pantalla y usa el formulario para reportar problemas.'}</div>
                </div>
            </div>

            <aside className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">Registrar problema</h3>

                <label className="block text-sm">Heurística afectada</label>
                <select value={heuristic} onChange={(e) => setHeuristic(e.target.value as HeuristicKey)} className="p-2 border rounded w-full mt-1">
                    {HEURISTICS.map(h => <option key={h.key} value={h.key}>{h.label}</option>)}
                </select>

                <label className="block text-sm mt-3">Severidad</label>
                <select value={severity} onChange={(e) => setSeverity(e.target.value as never)} className="p-2 border rounded w-full mt-1">
                    <option>Baja</option>
                    <option>Media</option>
                    <option>Alta</option>
                    <option>Crítica</option>
                </select>

                <label className="block text-sm mt-3">Descripción</label>
                <textarea value={detail} onChange={(e) => setDetail(e.target.value)} className="w-full p-2 border rounded mt-1" rows={6} />

                <div className="mt-4 flex gap-2">
                    <button onClick={reportProblem} className="px-3 py-2 bg-blue-600 text-white rounded">Guardar y ver resumen</button>
                    <button onClick={() => { setDetail(''); }} className="px-3 py-2 border rounded">Limpiar</button>
                </div>
            </aside>
        </div>
    );
}

function SummaryPage() {
    const problems = readLS<ProblemRecord[]>(STORAGE_KEY, []);

    function clearAll() {
        if (!confirm('¿Limpiar todos los problemas registrados?')) return;
        writeLS(STORAGE_KEY, []);
        window.location.reload();
    }

    function exportCSV() {
        const rows = [
            ['id', 'screenId', 'heuristic', 'detail', 'severity', 'timestamp'],
            ...problems.map(p => [p.id, p.screenId, p.heuristic, p.detail, p.severity, p.timestamp])
        ];
        const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'heuristica_problems.csv'; a.click(); URL.revokeObjectURL(url);
    }

    return (
        <div className="p-6">
            <h2 className="text-xl font-semibold">Resumen — Evaluación Heurística</h2>
            <div className="mt-4 flex gap-2">
                <button onClick={exportCSV} className="px-3 py-2 bg-blue-600 text-white rounded">Exportar CSV</button>
                <button onClick={clearAll} className="px-3 py-2 bg-red-600 text-white rounded">Limpiar</button>
            </div>

            <div className="mt-4 space-y-3">
                {problems.map(p => (
                    <div key={p.id} className="bg-white p-3 rounded shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <div className="font-medium">{HEURISTICS.find(h => h.key === p.heuristic)?.label ?? p.heuristic}</div>
                                <div className="text-xs text-slate-500">{p.screenId} — {new Date(p.timestamp).toLocaleString()}</div>
                            </div>
                            <div className="text-sm px-3 py-1 rounded bg-yellow-50">{p.severity}</div>
                        </div>
                        <div className="mt-2 text-sm text-slate-700">{p.detail}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// -------------------------
// Router (module default export)
// -------------------------
export default function HeuristicsModule() {
    return (
        <Routes>
            <Route path="/" element={<IntroPage />} />
            <Route path="/evaluate" element={<EvaluatePage />} />
            <Route path="/summary" element={<SummaryPage />} />
        </Routes>
    );
}
