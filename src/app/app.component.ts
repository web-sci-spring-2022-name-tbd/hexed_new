import { Component, ViewChild } from '@angular/core';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hexed_new';

  startTheGame = false;


  startGame(timer: TimerComponent) {
    console.log(timer);

    // check to see if name is inputted
    let name = document.getElementById("nameInput") as HTMLInputElement;
    if (name.value === '' || name.value == 'undefined') {
      alert("you must enter a name");
      return;
    }

    // check to se if time is inputted
    let time = document.getElementById("timeInput") as HTMLInputElement;
    let timeVal: number = parseInt(time.value);
    if (isNaN(timeVal)) {
      time.value = "60";
      timeVal = 60;
    }

    //start timer
    let timerHTML = document.getElementById("timer") as HTMLInputElement;
    this.startTimer(timer, timeVal, timerHTML);



    this.startTheGame = true;

  }

  startTimer(timer: TimerComponent, seconds: number, timerHTML: HTMLElement) {
    show(timerHTML);
    timer.seconds = seconds;
    timer.start();
  }
  
  getName(data: Array<string | number>) {
    console.log("Name is " + data[0] + ", and the time is " + data[1]);
  }

  stopGame() {
    this.startTheGame = false;
    let timerHTML = document.getElementById("timer") as HTMLInputElement;
    hide(timerHTML);
  }
}


// Show an element
var show = function (elem: HTMLElement) {
  let timer = document.getElementById("timer") as HTMLElement;
  hide(timer);
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem: HTMLElement) {
	elem.style.display = 'none';
};