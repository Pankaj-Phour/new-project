import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
@ViewChild('video') video:ElementRef
  constructor(private dialog:MatDialog, private _api:ApiService) { }

  ngOnInit(): void {
    this.playvideo();
    this._api.loginClickeEmitter.subscribe((event:any)=>{
      if(event){
        this.openDialog();
      }
    })
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


  openDialog(){
      let dialog = this.dialog.open(LoginComponent,{
        height: '648px',
        width: '1048px'
      })
  }
}
