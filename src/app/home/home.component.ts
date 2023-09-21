import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild('video') video:ElementRef;
mobile:boolean = false;
  constructor(private dialog:MatDialog, private _api:ApiService,private routeParam:ActivatedRoute,private _router:Router) { }


  @HostListener('window:resize',['$event'])
  checkWindowSize(){
    console.log(window.innerWidth);
    if(window.innerWidth<=768){
      this.mobile = true
    }
    else{
      this.mobile = false;
    }
  }


  ngOnInit(): void {
    this.playvideo();
    this.checkWindowSize();
  }


  playvideo() {
    let interval = setInterval(() => {
      if (this.video) {
        setTimeout(() => {
          this.video.nativeElement.muted = true;
          this.video.nativeElement.play();
        }, 1000);
        // this.video.nativeElement.play();
        clearInterval(interval);
      }
      // console.log(this.video);
    }, 100);
    // let video = document.getElementById('video')
  }

}
