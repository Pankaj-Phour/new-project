import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { CardDetailsComponent } from '../card-details/card-details.component'

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  profileForm:FormGroup;
  user:any;
  newValues:any;
  constructor(private _fb:FormBuilder,private _api:ApiService, private dialog:MatDialog) { }
  profile:any;
  ngOnInit(): void {
    this.validation();
    this.user = JSON.parse(localStorage.getItem('user'))
    console.log(this.user);

    this.profileForm.valueChanges.subscribe((value:any)=>{
      this.newValues = value;
      // console.log(this.newValues);
      
    })
    
  }


  validation(){
    this.profileForm = this._fb.group({
      name:['',Validators.required],
      expertise:['',Validators.required],
      services:['',Validators.required],
      image:['',Validators.required],
    })
  }

  Submit(){
    console.log("Hello from submit function",this.profileForm.value);
    this.dialog.open(CardDetailsComponent,{
      width:'800px'
    })
    
  }
  handleInput(e:any){
      if(e.target.files[0].type == 'image/jpeg' || e.target.files[0].type == 'image/bmp' || e.target.files[0].type == 'image/png' || e.target.files[0].type == 'image/jpg'){
        const file = e.target.files[0];
        const reader = new FileReader();
        const self = this;
        reader.readAsDataURL(file)
        reader.onload = function(event:any){
          console.log(event);
          self.profile = event.target.result;
        }
        reader.onloadend = function(event:any){
          console.log(self.profile);
        }
      }
      else{
      this._api.obNotify({
        start: true,
              code: 200,
              status: 'error',
              message: 'Only image files are supported'
      })
      }
    }
}
