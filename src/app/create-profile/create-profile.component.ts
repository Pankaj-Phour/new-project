import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.scss']
})
export class CreateProfileComponent implements OnInit {
  profileForm:FormGroup;
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.validation()
  }


  validation(){
    this.profileForm = this._fb.group({
      name:['',Validators.required],
      email:['',Validators.compose([Validators.email, Validators.required])],
      password:['',Validators.required],
      checkbox:['',Validators.required],
    })
  }

  Submit(){
    console.log("Hello from submit function",this.profileForm.value);
    
  }
}
