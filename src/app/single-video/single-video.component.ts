import { Component, OnInit, AfterViewInit,ChangeDetectorRef, HostListener } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-single-video',
  templateUrl: './single-video.component.html',
  styleUrls: ['./single-video.component.scss']
})
export class SingleVideoComponent implements OnInit, AfterViewInit {
selectedVideo:any;
commentData:any;
liked = false;
mobile:boolean;
comments = false;
  constructor(private _api:ApiService, private _cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkScreenSize();
    this.selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'))
    // console.log(this.selectedVideo);
    this._api.changeSelectedVideoEmitter.subscribe((data:any)=>{
      this.selectedVideo = data;
      console.log(this.selectedVideo);
    });


    


    this._api.addCommentEmitter.subscribe((data:any)=>{
      console.log("Data recieved from comments component",data);
      
      this.commentData = data;
    })
  }

  @HostListener('window:resize',['$event'])
    checkScreenSize(){
      if(window.innerWidth<=768){
        this.mobile = true;
      }
      else{
        this.mobile = false;
      }
    }

  ngAfterViewInit(){
    this._cdr.detectChanges();
    console.log(this.commentData);
    
  }

  likeVideo(e:any){
    this.liked = !this.liked;
  }

  addComment(){
    this.comments = !this.comments;
  }

}
