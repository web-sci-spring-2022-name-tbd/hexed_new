import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hexed_new';

  startTheGame = false;

  startGame() {
    this.startTheGame = true;
  }
  
  getName(data: Array<string | number>) {
    console.log("Name is " + data[0] + ", and the time is " + data[1]);
  }

  resetGame() {
    this.startTheGame = false;
  }
}
