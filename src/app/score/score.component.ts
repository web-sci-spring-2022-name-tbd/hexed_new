import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Output() getScoreEvent = new EventEmitter<ScoreComponent>();

  private scoreHTML: HTMLElement | null = null;
  private tableHTML: HTMLElement | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  emitToParent() {
    this.getScoreEvent.next(this);
  }

  getScore(remainingTime: number, timeLimit: number, color: String) {
    this.scoreHTML = document.getElementById("scoreNum") as HTMLElement;

    //grab rgb codes
    let r = document.getElementById("r-val") as HTMLInputElement;
    let r_value = Number(r.value);

    let g = document.getElementById("g-val") as HTMLInputElement;
    let g_value = Number(g.value);

    let b = document.getElementById("b-val") as HTMLInputElement;
    let b_value = Number(b.value);

    let userCode = rgbToHex(r_value, g_value, b_value);

    color = rgb2hex(color);
    let actual_red = parseInt(color[1]+color[2],16);
    let actual_green = parseInt(color[3]+color[4],16);
    let actual_blue = parseInt(color[5]+color[6],16);
    let arr:Array<number | String> = [r_value, g_value, b_value, color, actual_red, actual_green, actual_blue, remainingTime, timeLimit];
    console.log(arr)

    let score = ((255 - Math.abs(actual_red - r_value)) + (255 - Math.abs(actual_green - g_value)) + (255 - Math.abs(actual_blue - b_value)) * Math.floor(remainingTime) * (1000 * (101 - timeLimit)));

    this.scoreHTML!.textContent = String(score);
  } 

}

const rgb2hex = (rgb: any) => `#${rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map((n: string) => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}