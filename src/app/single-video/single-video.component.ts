import { Component, OnInit, AfterViewInit,ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
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

@ViewChild('video') video:ElementRef;
  constructor(private _api:ApiService, private _cdr:ChangeDetectorRef) { }

  ngOnInit(): void {
    this.checkScreenSize();
    this.selectedVideo = JSON.parse(localStorage.getItem('selectedVideo'))
    // console.log(this.selectedVideo);
    this._api.changeSelectedVideoEmitter.subscribe((data:any)=>{
      this.selectedVideo = data;
      console.log(this.selectedVideo);
      setTimeout(() => {
        
        // this.video.nativeElement.play();
        this.playVideo();
      }, 1500);
    });


    this._api.toggleCommentSectionEmitter.subscribe((data:any)=>{
      this.addComment();
    })

    


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
    this.video.nativeElement.play();
  }

  likeVideo(e:any){
    this.liked = !this.liked;
  }

  addComment(){
    this.comments = !this.comments;
  }

  playVideo(){
    this.video.nativeElement.play();
  }

}
