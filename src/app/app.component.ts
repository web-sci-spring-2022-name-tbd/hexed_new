import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ColorComponent } from './color/color.component';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'hexed_new';

  startTheGame = false;
  private timerHTML: HTMLInputElement | null = null;
  private colorHTML: HTMLElement | null = null;

  startGame(timer: TimerComponent, color: ColorComponent) {
    this.timerHTML = document.getElementById("timer") as HTMLInputElement;
    this.colorHTML = document.getElementById("color") as HTMLElement;
    console.log(this.colorHTML)
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
    this.startTimer(timer, timeVal);
    this.showColor(color);

    this.startTheGame = true;

  }

  startTimer(timer: TimerComponent, seconds: number) {
    console.log(this.timerHTML)
    show(this.timerHTML!);
    timer.seconds = seconds;
    timer.start();
  }

  showColor(color: ColorComponent) {
    console.log(color)
    color.generate();
    show(this.colorHTML!)
  }
  
  getName(data: Array<string | number>) {
    console.log("Name is " + data[0] + ", and the time is " + data[1]);
  }

  stopGame() {
    this.startTheGame = false;
    hide(this.timerHTML!);
    hide(this.colorHTML!)
  }
}


// Show an element
var show = function (elem: HTMLElement) {
	elem.style.display = 'block';
};

// Hide an element
var hide = function (elem: HTMLElement) {
	elem.style.display = 'none';
};

// // just trying something here
// export class ViewChildParentComponent implements AfterViewInit {

//   @ViewChild(TimerComponent)
//   private timerComponent_!: TimerComponent;

//   seconds() { return 0; }

//   ngAfterViewInit(): void {
//     setTimeout(() => this.seconds = () => this.timerComponent_.seconds, 0)
//   }

//   start() { this.timerComponent_.start(); }
//   stop() { this.timerComponent_.stop(); }

// }
