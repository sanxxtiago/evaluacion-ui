import React from 'react';
import { readLS, writeLS } from './data/cognitiveStore.ts';
type Step = {
    detail: string;
};

type ErrorItem = {
    detail: string;
};

type Session = {
    id: string;
    taskId: string;
    taskTitle: string;
    startedAt: string;
    finishedAt: string;
    durationSec: number;
    steps: Step[];
    errors: ErrorItem[];
};

type Feedback = {
    sessionId: string;
    difficulty: string;
    comments: string;
};

export default function Summary() {
    const sessions = readLS<Session[]>('cw_sessions', []);
    const feedbacks = readLS<Feedback[]>('cw_feedbacks', []);

    const clearAll = () => {
        const confirmed = window.confirm('Limpiar datos?');
        if (confirmed) {
            writeLS('cw_sessions', []);
            writeLS('cw_feedbacks', []);
            window.location.reload();
        }
    };

    const rows: (string | number)[][] = [
        [
            'sessionId',
            'taskId',
            'taskTitle',
            'startedAt',
            'finishedAt',
            'durationSec',
            'steps',
            'errors',
            'difficulty',
            'comments'
        ]
    ];

    sessions.forEach((s) => {
        const fb = feedbacks.find((f) => f.sessionId === s.id);

        rows.push([
            s.id,
            s.taskId,
            s.taskTitle,
            s.startedAt,
            s.finishedAt,
            s.durationSec,
            (s.steps ?? []).map((x) => x.detail).join('||'),
            (s.errors ?? []).map((x) => x.detail).join('||'),
            fb?.difficulty ?? '',
            fb?.comments ?? ''
        ]);
    });

    const exportCSV = () => {
        const csv = rows
            .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
            .join('\n');

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'recorrido_summary.csv';
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <div>
            {/* Agrega aquí tu JSX real si deseas */}
        </div>
    );
}