// src/app/home/home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrainingService, TrainingSession } from '../services/training.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  warmup: number = 0;
  run: number = 0;
  walk: number = 0;
  cycles: number = 0;
  cooldown: number = 0;

  constructor(private router: Router, private trainingService: TrainingService) {}

  startTraining() {
    const session: TrainingSession = {
      id: this.generateId(),
      warmup: this.warmup,
      run: this.run,
      walk: this.walk,
      cycles: this.cycles,
      cooldown: this.cooldown,
      completed: false
    };

    this.trainingService.addSession(session);
    this.router.navigate(['/summary']);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
