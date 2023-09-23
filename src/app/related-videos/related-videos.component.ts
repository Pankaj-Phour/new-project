import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-related-videos',
  templateUrl: './related-videos.component.html',
  styleUrls: ['./related-videos.component.scss']
})
export class RelatedVideosComponent implements OnInit {
videos:any;

  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.videos = JSON.parse(localStorage.getItem('videos'));
    console.log(this.videos);
    
  }


  changeVideo(video:any){
    this._api.changeSelectedVideo(video)
  }
}
