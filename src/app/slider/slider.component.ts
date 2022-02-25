import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {
  @Input() c: string = "";
  @Input() color: string = "";
  @Input() val: string = "50";
  constructor() {
  }

  ngOnInit(): void {
  }

  change(obj: SliderComponent):void {
    let input = document.getElementById(`${obj['c']}-val`) as HTMLInputElement;
    let slider = document.getElementById(`${obj['c']}-input`) as HTMLInputElement;
    input.value = slider.value;
  }

}
