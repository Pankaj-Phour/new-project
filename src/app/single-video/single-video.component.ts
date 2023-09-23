import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {
selectedVideo:any;
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'))
    console.log(this.selectedVideo);
    

    this._api.changeSelectedVideoEmitter.subscribe((data:any)=>{
      this.selectedVideo = data;
      console.log(this.selectedVideo);
      
    })
  }

}
