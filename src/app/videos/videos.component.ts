import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
@Input() pexelVideos:any;
  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  
  watchVideo(video:any){
    console.log(video)
    localStorage.setItem('selectedVideo',JSON.stringify(video))
    this._router.navigate(['./singleVideo'])
      // this.dialog.open(watchVideoComponent,{
      //  data : video.link
       
      // })
  }

}
