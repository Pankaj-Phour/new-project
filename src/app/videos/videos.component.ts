import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
@Input() pexelVideos:any;
  constructor() { }

  ngOnInit(): void {
  }

  
  watchVideo(video:any){
    console.log(video)
    
      // this.dialog.open(watchVideoComponent,{
      //  data : video.link
       
      // })
  }

}
