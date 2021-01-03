import { Component } from '@angular/core';
import { DIES, TimerStatus } from '../assets/constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Boggle';
  board: string[][] = [];
  time = 0;
  interval?: NodeJS.Timeout;
  timeRemaining = '';
  TimerStatus = TimerStatus;
  timerStatus = TimerStatus.WAITING;

  startGame(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.shakeBoard();
    this.startTimer();
  }

  shakeBoard(): void {
    let diesCopy = JSON.parse(JSON.stringify(DIES));
    const board: string[][] = [];
    for (let row = 0; row < 4; row++) {
      const r = [];
      for (let col = 0; col < 4; col++) {
        const die = Math.floor(Math.random() * diesCopy.length);
        const face = Math.floor(Math.random() * 6);
        const faceValue = diesCopy[die][face];
        r.push(faceValue);
        diesCopy = diesCopy.slice(0, die).concat(diesCopy.slice(die + 1));
      }
      board.push(r);
    }
    this.board = board;
  }

  startTimer(): void {
    this.time = 0;
    this.timerStatus = TimerStatus.RUNNING;
    this.timeRemaining = '3:00';
    this.interval = setInterval(() => {
      this.time++;
      const remainingTime = PLAY_TIME - this.time;
      const remainingMinutes = Math.floor(remainingTime / 60);
      const remainingSeconds = (remainingTime % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      this.timeRemaining = remainingTime > 0 ? `${remainingMinutes}:${remainingSeconds}` : 'Expired';
      if (this.time === PLAY_TIME - 30) {
        this.timerStatus = TimerStatus.NEAR_END;
      }
      if (this.interval && this.time >= PLAY_TIME) {
        this.timerStatus = TimerStatus.EXPIRED;
        clearInterval(this.interval);
      }
    }, 1000);
  }
}

const PLAY_TIME = 180;
