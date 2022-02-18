import { Component, OnInit, SimpleChange } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { Input } from '@angular/core'; 
import { SimpleChanges } from '@angular/core'; 

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.css']
})

export class NameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() startGame = false;
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['startGame'].currentValue != true) {
      return
    }

    // Need the <HTMLInputElement> so TS knows how to handle the type
    var name = (<HTMLInputElement>document.getElementById('nameInput')).value;
    var time = (<HTMLInputElement>document.getElementById('timeInput')).value;
    this.sendData(name, time);
  }

  @Output() newDataEvent = new EventEmitter<Array <string | number> >();

  sendData(name: string, time: string) {
    this.newDataEvent.emit([name, parseInt(time)]);
  }
}
