// src/app/training.service.ts
import { Injectable } from '@angular/core';

export interface TrainingSession {
  id: string;
  warmup: number;
  run: number;
  walk: number;
  cycles: number;
  cooldown: number;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private sessions: TrainingSession[] = [];

  constructor() {
    this.loadSessionsFromStorage();
  }

  private loadSessionsFromStorage() {
    const storedSessions = localStorage.getItem('completedSessions');
    if (storedSessions) {
      this.sessions = JSON.parse(storedSessions);
    }
  }

  private saveSessionsToStorage() {
    localStorage.setItem('completedSessions', JSON.stringify(this.sessions));
  }

  getSessions(): TrainingSession[] {
    return this.sessions;
  }

  addSession(session: TrainingSession) {
    this.sessions.push(session);
    this.saveSessionsToStorage();
  }

  markCompleted(id: string) {
    const session = this.sessions.find(s => s.id === id);
    if (session) {
      session.completed = true;
      this.saveSessionsToStorage();
    }
  }

  removeSession(id: string) {
    this.sessions = this.sessions.filter(session => session.id !== id);
    this.saveSessionsToStorage();
  }
}
