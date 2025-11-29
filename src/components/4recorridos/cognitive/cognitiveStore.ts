// src/components/4recorridos/cognitive/cognitiveStore.ts

export interface Step {
  detail: string;
  timestamp: string;
}

export interface ErrorItem {
  detail: string;
  timestamp: string;
}

export interface Session {
  id: string;
  taskId: string;
  taskTitle: string;
  startedAt: string;
  finishedAt: string;
  durationSec: number;
  steps: Step[];
  errors: ErrorItem[];
  result?: string;
}

export interface Feedback {
  sessionId: string;
  difficulty: string;
  comments: string;
}

export function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeLS<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export const SESSIONS_KEY = "cw_sessions";
export const FEEDBACK_KEY = "cw_feedbacks";
