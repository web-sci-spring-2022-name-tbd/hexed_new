import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HighscoresService } from '../highscores.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {
  @Output() getScoreEvent = new EventEmitter<ScoreComponent>();

  private scoreHTML: HTMLElement | null = null;
  private tableHTML: HTMLElement | null = null;
  private scores: Array<Array<number | String>> = [];
  private localScores: Array<Array<number | String>> = [];

  
  ngOnInit(): void {
    // this.pullScores();
    this.updateScores(["", 0]);
  }


  public get scoreArray(): Array<Array<number | String>> {
    this.scores.sort((a: Array<number | String>, b: Array<number | String>) => {
      return (a[1] > b[1] ? -1 : 1);
    })
    return this.scores;
  }

  public get score1() {
    let scores = this.scoreArray;
    let arr = scores.filter(v => Number.isInteger(v as unknown as number));

    return arr;
  }


  public get score2() {
    let scores = this.scoreArray;
    let arr: Array<String | number> = [];
    scores.forEach((element: Array<String | number>) => {
      arr.push(element[0]);
    });

    return arr;
  }


  constructor(private service: HighscoresService) { }


  emitToParent() {
    this.getScoreEvent.next(this);
  }

  getScore(remainingTime: number, timeLimit: number, color: String, name: String) {
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

    let actual_red = parseInt(color[1] + color[2], 16);
    let actual_green = parseInt(color[3] + color[4], 16);
    let actual_blue = parseInt(color[5] + color[6], 16);
    // console.log(`guessed\tr: ${r_value} g: ${g_value} b: ${b_value}`)
    // console.log(`actual\tr: ${actual_red} g: ${actual_green} b: ${actual_blue}`)
    // console.log(`time remaining: ${remainingTime} time limit: ${timeLimit}`)

    let score = ((255 - Math.abs(actual_red - r_value)) + (255 - Math.abs(actual_green - g_value)) + (255 - Math.abs(actual_blue - b_value)) * Math.floor(remainingTime) * (1000 * (101 - timeLimit)));

    this.scoreHTML!.textContent = String(score);    
    return [name, score];
  }

  updateScores(info: Array<number | string>) {
    this.scores = [];
    this.service.sendGet('getscores').subscribe((response: any) => {
      Object.entries(response['scores']).forEach(
        ([key, value]) => {
          this.scores.push([key, Number(value)])
        }
      );

      console.log(info)
      let name = info[0] as string;
      let score = info[1] as number;
      let lowest = this.scores[this.scores.length - 1][1] as number;

      if (score > lowest) {
        this.service.sendGet(`sendscore?${name}=${score}`);
      }

      this.localScores.push([name, score]);
  
      for (const x of this.localScores) {
        this.scores.push(x);
      }

    }, (error) => {
      console.log('Error is ', error);
    })


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