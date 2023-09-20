import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';

const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {
    path:'login', 
    component:LoginComponent
  },
  {
    path:'catalogue',
    component:CatalogueComponent
  },
  {
    path:'create-profile',
    component:CreateProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
