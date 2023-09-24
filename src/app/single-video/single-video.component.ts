import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit {
selectedVideo:any;
commentData:any;
liked = false;
  constructor(private _api:ApiService) { }

  ngOnInit(): void {
    this.selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'))
    console.log(this.selectedVideo);
    this.commentData = JSON.parse(localStorage.getItem('comments'));
    console.log(this.commentData);
    
    this._api.changeSelectedVideoEmitter.subscribe((data:any)=>{
      this.selectedVideo = data;
      console.log(this.selectedVideo);
      
    })


    this._api.addCommentEmitter.subscribe((data:any)=>{
      this.commentData = data;
    })
  }


  likeVideo(e:any){
    this.liked = !this.liked;
  }

}
