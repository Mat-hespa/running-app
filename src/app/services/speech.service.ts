// src/app/speech.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  private synth = window.speechSynthesis;

  speak(text: string, lang: string = 'en-US') {
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang; // Define o idioma
    this.synth.speak(utterance);
  }
}
