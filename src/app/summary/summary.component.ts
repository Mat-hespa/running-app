// src/app/summary/summary.component.ts
import { Component, OnInit } from '@angular/core';
import { TrainingService, TrainingSession } from '../services/training.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  sessions: TrainingSession[] = [];
  activeSessionIndex: number | null = null;

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.sessions = this.trainingService.getSessions();
  }

  startSession(index: number) {
    this.activeSessionIndex = index;
  }

  completeSession() {
    if (this.activeSessionIndex !== null) {
      const session = this.sessions[this.activeSessionIndex];
      this.trainingService.markCompleted(session.id);
      this.activeSessionIndex = null;
    }
  }

  removeSession(index: number) {
    const session = this.sessions[index];
    this.trainingService.removeSession(session.id);
    this.sessions = this.trainingService.getSessions(); // Refresh the sessions list
  }
}
