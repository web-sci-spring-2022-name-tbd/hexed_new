import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})


function updateValue(val: number, color: String) {
    var color_val = document.getElementById(`#${color}-val`) as ;
    color_val.value = val;
}

function startCountdown(seconds: number) {
    let counter: number = seconds;

    const interval = setInterval(() => {
        // $('#timer').html(String(counter));
        var timer = document.getElementById('#timer');
        timer!.innerHTML = counter.toString();
        counter--;

        if (counter < 0) {
            clearInterval(interval);
            // $("#submit").prop("disabled", false);
            // $("#start").prop("disabled", false);
        }
    }, 1000);
}



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
