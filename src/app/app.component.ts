import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Team-project';


  constructor(private _api:ApiService,private _router:Router,private dialog:MatDialog){}

  ngOnInit(): void {
    this._api.loginClickeEmitter.subscribe((event:any)=>{
      if(event){
        this.openDialog();
      }
    })
  }

  openDialog(){
    this._api.loginClicked(false);
    if(window.location.href == 'https://pankaj-practice.netlify.app/#/' || window.location.href == 'http://localhost:9518/#/'){
      let dialog = this.dialog.open(LoginComponent,{
        height: '648px',
        width: '1048px'
      })
    }
    else{
      this._router.navigate(['/']);
      let dialog = this.dialog.open(LoginComponent,{
        height: '648px',
        width: '1048px'
      })
    }
  }
}
