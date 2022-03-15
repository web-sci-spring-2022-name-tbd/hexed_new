import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})



export class TimerComponent implements OnInit {
  intervalID = 0;
  // message = '';
  checker = true;

  @Input() seconds: number = 60;
  @Input() message: String = "";
  

  constructor() { }

  ngOnInit(): void {
  }

  start() { 
    this.message = `${this.seconds} second${this.seconds === 1 ? '' : 's'} left`;
    this.seconds -= 1;
    this.countDown(); 
  }
  stop() {
    this.clearTimer();
  }

  clearTimer() { clearInterval(this.intervalID); }

  countDown() {
    this.clearTimer();
    this.intervalID = window.setInterval(() => {
      // if (this.checker) {
        if (this.seconds == 0) {
          this.message = '0 seconds remaining';
          alert("you are out of time")
          // emit something to parent
          this.clearTimer();
        } else {
          this.message = `${this.seconds} second${this.seconds === 1 ? '' : 's'} left`;
          this.seconds -= 1;
        }
      // } else {
      //   this.clearTimer();
      // }
    }, 1000);
  
  }

  // stopCountDown() {
  //   this.checker = false;
  //   this.message = `${this.seconds} second${this.seconds === 1 ? '' : 's'} left`;
  // }
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
