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
  constructor(private router:Router,private _api:ApiService) { }

  ngOnInit(): void {
  }

  closeNav(link:any){
    console.log(link);
    if(link !== ''){
      this.router.navigate([link])
    }
    this.mobileNav = false;
  }

  openNav(){
    this.mobileNav = !this.mobileNav;
  }
  login(){
    console.log("Hello from navbar login");
    this._api.loginClicked(true)
    
  }

}
