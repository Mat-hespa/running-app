// src/app/timer/timer.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { SpeechService } from '../services/speech.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input() warmup: number = 0;
  @Input() run: number = 0;
  @Input() walk: number = 0;
  @Input() cycles: number = 0;
  @Input() cooldown: number = 0;
  @Output() trainingComplete = new EventEmitter<void>();

  currentPhase: string = 'warmup';
  remainingTime: number = 0;
  currentCycle: number = 1;
  interval: any;

  constructor(private speechService: SpeechService) {}

  ngOnInit() {
    this.startPhase(this.warmup, 'warmup');
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startPhase(duration: number, phase: string) {
    this.remainingTime = duration * 60;
    this.currentPhase = phase;
    this.speechService.speak(this.currentPhase);
    this.interval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        clearInterval(this.interval);
        this.nextPhase();
      }
    }, 1000);
  }

  nextPhase() {
    switch (this.currentPhase) {
      case 'warmup':
        if (this.cycles > 0) {
          this.startPhase(this.run, 'run');
        } else {
          this.startPhase(this.cooldown, 'cooldown');
        }
        break;
      case 'run':
        this.startPhase(this.walk, 'walk');
        break;
      case 'walk':
        if (this.currentCycle < this.cycles) {
          this.currentCycle++;
          this.startPhase(this.run, 'run');
        } else {
          this.startPhase(this.cooldown, 'cooldown');
        }
        break;
      case 'cooldown':
        this.trainingComplete.emit();
        break;
    }
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
  }

  pad(value: number): string {
    return value < 10 ? '0' + value : value.toString();
  }
}
