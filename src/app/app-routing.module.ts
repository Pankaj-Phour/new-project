import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { AuthGuard } from './services/auth.guard';
import { NewLoginComponent } from './new-login/new-login.component';
import { SingleVideoComponent } from './single-video/single-video.component';

const routes: Routes = [
  {
    path:'', 
    component:HomeComponent
  },
  {
    path:'newLogin', 
    component:NewLoginComponent
  },
  {
    path:'catalogue',
    component:CatalogueComponent
  },
  {
    path:'create-profile',
    component:CreateProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path:'singleVideo',
    component:SingleVideoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
