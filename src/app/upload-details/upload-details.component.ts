import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss']
})
export class UploadDetailsComponent implements OnInit, AfterViewInit {
  videoData:FormGroup;
  videoUrl:any;
  thumbnails:any = [];
  newThumbs:any = [];
  thumbnailsGenerated:boolean = false;
  selectedthumbnail:number = 0;
  newSelectedThumbnail:number;
  @Input() video:any;
  @ViewChild('videoElement') videoElement:ElementRef;
  constructor(private _fb:FormBuilder, private renderer:Renderer2, private sanitizer:DomSanitizer, private _api:ApiService) { }

  ngOnInit(): void {
    this.validation();
    
  }


ngAfterViewInit(){
  this.getVideoUrl();
}

  validation(){
    this.videoData = this._fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      thumbnail:['',Validators.required],
    })
  }

  getVideoUrl(){
    const video = this.renderer.createElement('video');
    this.renderer.setAttribute(video,'src',window['URL'].createObjectURL(this.video))
    console.log(video);
    // console.log(window['URL'].createObjectURL(this.video));
    this.videoUrl = window['URL'].createObjectURL(this.video);
    this.videoUrl =  this.sanitizer.bypassSecurityTrustUrl(this.videoUrl);
    console.log(this.videoUrl);
    setTimeout(() => {
      this.videoElement.nativeElement.src = this.videoUrl.changingThisBreaksApplicationSecurity;
    }, 500);
  }

  canplaythrough(e:any){
    console.log("Hello from canplaythrough");
    if(e.target.readyState === 4 && !this.thumbnailsGenerated){
      console.log("Video is ready to play");
      this.generateThumbnail();
    }
  }

  generateThumbnail(){
    // this.videoElement.nativeElement.play();
    for(let i=1;i<6;i++){
      setTimeout(() => {
        if(i<5){
          const canvas = this.capture(this.videoElement.nativeElement,0.8);
          if(this.thumbnails.findIndex((m:any)=> m && m.path === canvas.toDataURL()) === -1){
            this.thumbnails.push({ path: canvas.toDataURL() })
          }
          this.videoElement.nativeElement.currentTime = ((this.videoElement.nativeElement.duration / 4 ) * i);
          console.log(this.thumbnails,this.videoElement,this.videoElement.nativeElement.currentTime,this.videoElement.nativeElement.duration);
        }
        else{
          this.videoElement.nativeElement.currentTime = 0;
        }
        }, 1000*i);
      
    }
    this.thumbnailsGenerated = true;
    
  }

  capture(video:any,scale:any){
    const w = video.videoWidth * scale;
    const h = video.videoHeight * scale;
    const canvas = document.createElement("canvas");
    canvas["width"] = w;
    canvas["height"] = h;
    const ctx = canvas["getContext"]("2d");
    ctx.drawImage(video, 0, 0, w, h);
    return canvas as HTMLCanvasElement;
  }


  selectThumbnail(thumbnailArray:any,index:any){
    console.log(index);
    if(thumbnailArray == 'default'){
      this.newSelectedThumbnail = 5;
      this.selectedthumbnail = index;
    }
    else{
      this.selectedthumbnail = 5;
      this.newSelectedThumbnail = index;
    }
    
  }

  removeThumbnail(thumbnailArray:any,index:number){
    console.log("removing thumbnail number ", index);
    if(thumbnailArray === 'default'){
      if(this.thumbnails.length>1){
        this.selectedthumbnail === index ? this.selectedthumbnail = 0 : '';
        this.thumbnails.splice(index, 1);
      }
      else{
        this.warn('warn','You must have at least one default thumbnail')
      }
    }
    else{
      if(this.newSelectedThumbnail===index){
        this.newSelectedThumbnail = 0;
        if(this.newThumbs.length===1){
          this.newSelectedThumbnail === index && this.selectedthumbnail === 5 ? this.selectedthumbnail = 0 : '';
        }
      }
        this.newThumbs.splice(index,1)
      
    }
    
  }


  newThumb() {
    // console.log("Shoot 315");
    const canvas = this.capture(this.videoElement.nativeElement, 0.8);
    this.newThumbs.length < 4
      ? this.newThumbs.filter((a) => a.path === canvas.toDataURL()).length === 0
        ? this.newThumbs.unshift({ path: canvas.toDataURL() })
        : this.warn("warn", "Same thumbnail")
      : this.warn("warn", "Max 4 thumbnail allowed");
  }

  warn(status:any,message:any){
    this._api.obNotify({
      start:true,
      code:200,
      status:status,
      message:message
    })
  }
}
