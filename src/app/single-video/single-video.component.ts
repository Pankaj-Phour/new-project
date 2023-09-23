import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {
selectedVideo:any;
  constructor() { }

  ngOnInit(): void {
    this.selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'))
    console.log(this.selectedVideo);
    
  }

}
