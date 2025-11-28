export interface Step {
  detail: string;
}

export interface ErrorItem {
  detail: string;
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
}

export interface Feedback {
  sessionId: string;
  difficulty: string;
  comments: string;
}

export function readLS<T>(key: string, fallback: T): T {
  try {
    const v = localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch (e) {
    return fallback;
  }
}
export function writeLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}
