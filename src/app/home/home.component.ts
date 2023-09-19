import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild('video') video:ElementRef
  constructor() { }

  ngOnInit(): void {
    this.playvideo();
  }


  playvideo() {
    let interval = setInterval(() => {
      if (this.video) {
        setTimeout(() => {
          this.video.nativeElement.muted = true;
          this.video.nativeElement.play();
        }, 1000);
        // this.video.nativeElement.play();
        clearInterval(interval);
      }
      // console.log(this.video);
    }, 100);
    // let video = document.getElementById('video')
  }
}
