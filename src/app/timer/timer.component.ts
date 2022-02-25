import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  intervalID = 0;
  message = '';
  

  @Input() seconds: number = 60;

  constructor() { }

  ngOnInit(): void {
  }

  start() { this.countDown(); }
  stop() {
    this.clearTimer();
  }

  clearTimer() { clearInterval(this.intervalID); }

  countDown() {
    this.clearTimer();
    this.intervalID = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.message = 'times up!';
      } else {
        this.message = `${this.seconds} seconds left`;
      }
    }, 1000);
  }

}
