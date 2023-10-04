import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mobileNav:boolean = false;
  loggedIn:boolean;
  user:any;
  constructor(private router:Router,private _api:ApiService) { }

  ngOnInit(): void {
    if(localStorage.getItem('logged_in')){
      let logged_in = JSON.parse(localStorage.getItem('logged_in'));
      if(logged_in){
        this.loggedIn = true;
        this.user = JSON.parse(localStorage.getItem('user'));
      }
    }

    this._api.loggedInEmitter.subscribe((data:any)=>{
      this.loggedIn = data;
      this.user = JSON.parse(localStorage.getItem('user'));
    })
  }

  closeNav(link:any){
    console.log(link);
    if(link !== ''){
      this.router.navigate([link])
    }
    this.mobileNav = false;
  }

  toggleNav(){
    this.mobileNav = !this.mobileNav;
  }
  login(){
    console.log("Hello from navbar login");
    this._api.loginClicked(true)
  }

  logout(){
    localStorage.clear();
    this._api.loggedIn(false);
    this.closeNav('/')
  }

}
