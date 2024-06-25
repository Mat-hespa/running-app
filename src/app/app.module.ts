import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SetupComponent } from './setup/setup.component';
import { TimerComponent } from './timer/timer.component';
import { SummaryComponent } from './summary/summary.component';
import { FormsModule } from '@angular/forms';
import { SpeechService } from './services/speech.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SetupComponent,
    TimerComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SpeechService],
  bootstrap: [AppComponent]
})
export class AppModule { }
