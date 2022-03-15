import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ColorComponent } from './color/color.component';
import { ScoreComponent } from './score/score.component';
import { TimerComponent } from './timer/timer.component';
import { HighscoresService } from './highscores.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'hexed_new';

  public startTheGame = false;
  private timerHTML: HTMLInputElement | null = null;
  private colorHTML: HTMLElement | null = null;
  private scoreHTML: HTMLElement | null = null;
  timeVal: number = 60;
  name: String = "";

  constructor() { }


  startGame(timer: TimerComponent, color: ColorComponent) {
    this.timerHTML = document.getElementById("timer") as HTMLInputElement;
    this.colorHTML = document.getElementById("color") as HTMLElement;
    this.scoreHTML = document.getElementById("notSubmitScore") as HTMLElement;
    console.log(this.colorHTML)
    // check to see if name is inputted
    let nameHTML = document.getElementById("nameInput") as HTMLInputElement;
    this.name = nameHTML.value;
    if (this.name === '' || this.name == 'undefined') {
      alert("you must enter a name");
      return;
    }

    // check to se if time is inputted
    let time = document.getElementById("timeInput") as HTMLInputElement;
    this.timeVal = parseInt(time.value);
    if (isNaN(this.timeVal)) {
      time.value = "60";
      this.timeVal = 60;
    }

    if (this.timeVal > 100 || this.timeVal < 1) {
      alert("Enter a valid time");
      return;
    }


    //start timer
    this.startTimer(timer, this.timeVal);
    this.showColor(color);

    this.startTheGame = true;

  }

  startTimer(timer: TimerComponent, seconds: number = 60) {
    show(this.timerHTML!, 'flex');
    timer.seconds = seconds;
    timer.start();
  }

  showColor(color: ColorComponent) {
    color.generate();
    show(this.colorHTML!, 'block')
    let button = document.getElementById("submitScore") as HTMLButtonElement;
    show(button, 'block');
    // show(this.scoreHTML!)
  }

  getName(data: Array<string | number>) {
    console.log("Name is " + data[0] + ", and the time is " + data[1]);
  }

  stopGame(timer: TimerComponent) {
    this.startTheGame = false;
    hide(this.timerHTML!);
    hide(this.colorHTML!);
    hide(this.scoreHTML!);
    let submitButton = document.getElementById("submitScore") as HTMLElement;
    timer.stop();
    hide(submitButton);
  }

  parentScore(data: ScoreComponent, timer: TimerComponent) {
    let timeRemaining: number = Number(timer.seconds);
    let timeLimit: number = this.timeVal;
    let color: String = document.querySelector("body")!.style.backgroundColor;
    console.log(color);
    let name: String = this.name;
    let info = data.getScore(timeRemaining, timeLimit, color, name) as Array<string | number>;
    data.updateScores(info);
    show(this.scoreHTML!, 'block') 
  }
}


// Show an element
var show = function (elem: HTMLElement, style: string) {
  elem.style.display = style;
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
