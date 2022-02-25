import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  colorHex: string = "";
  colorHTML: HTMLElement;

  constructor() { 
    this.colorHTML = document.getElementById("color")!;
  }

  ngOnInit(): void {
    this.colorHTML = document.getElementById("color")!;
  }
  generate() {
    this.colorHTML = document.getElementById("color")!;
    this.colorHex = '#' + Math.floor(Math.random()*16777215).toString(16);
    this.colorHTML.style.backgroundColor = this.colorHex;
  }

}
