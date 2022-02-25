import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})


function updateValue(val: number, color: String) {
    var color_val = document.getElementById(`#${color}-val`) as ;
    color_val.value = val;
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



export class TimerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
