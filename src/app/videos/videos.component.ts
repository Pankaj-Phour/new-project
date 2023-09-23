import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
@Input() pexelVideos:any;
selectedVideo:any;
constructor(private _router:Router) { }

ngOnInit(): void {
    // localStorage.setItem('videos',JSON.stringify(this.pexelVideos))
  }

  
  watchVideo(video:any){
    console.log(video)
    localStorage.setItem('selectedVideo',JSON.stringify(video))
    this._router.navigate(['./singleVideo'])
      // this.dialog.open(watchVideoComponent,{
      //  data : video.link
       
      // })
  }

  mouseOver(videoIndex:any){
    this.pexelVideos.forEach((video,index) =>{
      if(videoIndex === index){
        this.pexelVideos[index]['showDetails'] = true
      }
      else{
        this.pexelVideos[index]['showDetails'] = false;
      }
    })
    console.log(this.pexelVideos);
    
  }
  
  mouseLeave(index:any){
    this.pexelVideos[index]['showDetails'] = false;
  }

}
