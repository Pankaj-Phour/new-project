import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
