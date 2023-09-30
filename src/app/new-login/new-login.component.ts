import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.scss']
})
export class NewLoginComponent implements OnInit {
  signupForm: any = FormGroup;
  signinForm: any = FormGroup;
  otpForm: any = FormGroup;
  signIn: boolean = false;
  contactError: boolean = false;
  check: boolean = true;
  contactLength: any;
  password: any;
  Cpassword: any;
  differentPassword: boolean = false;
  numberSubmit: boolean = false;
  invalidOtp: boolean = true;
  otpSubmit:boolean = false;
  user: any;
  loggedIn: any;
  emailLogin: boolean = true;
  constructor(private fb: FormBuilder, 
    private router: Router,
      private _cdr:ChangeDetectorRef,
      private _as:ApiService,
      private dialog:MatDialog
      ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      contact: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(14)])],
      password: ['', Validators.required],
      address: ['', Validators.required],
      checkbox: ['', Validators.required]
    })
    if (this.emailLogin) {
      this.signinForm = this.fb.group({
        email: ['', Validators.compose([Validators.required, Validators.email])]
      })
    }
    else {
      this.signinForm = this.fb.group({
        contact: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(14)])]
      })
    }
    this.otpForm = this.fb.group({
      otp: ['', Validators.required]
    })
  }

  ngAfterViewInit(): void {
      this._cdr.detectChanges();
  }
  Signin() {
    this.signIn = !this.signIn;
    this.numberSubmit = false;
    var cards = document.querySelectorAll('.box');
    [...cards as any].forEach((card) => {
      card.classList.toggle('is-flipped');
    });

  }

  Submit() {
    if (this.signIn) {
      let params = {};
      if (this.emailLogin) {
        params = {
          email: this.signinForm.value.email
        }
      }
      else {
        params = {
          contact: this.signinForm.value.contact
        }
      }
      this.signInwithEmail(params)
      this.numberSubmit = true;
    }
    else {
      this.numberSubmit = true;
      const params = this.signupForm.value;
      this.signupWithEmail(params)
    }
    // this.signinForm.reset();
    // this.signinForm.reset();
  }

  contactInput(e: any) {
    if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      this.contactLength ? this.contactLength.length > 13 || this.contactLength.length < 6 ? this.contactError = true : this.contactError = false : this.contactError = false
      this.contactLength ? this.contactLength.length > 13 ? e.keyCode !== 8 ? e.preventDefault() : '' : '' : ''
    }
    else {
      e.preventDefault();
      this.contactError = true;
    }
  }
  contactLengthChecker(e: any) {
    this.contactLength = e.target.value;
  }


  passwordInput(e: any) {
    this.Cpassword = e.target.value;
    if (e.target.value !== this.password) {
      this.differentPassword = true
    }
    else {
      this.differentPassword = false
    }
  }
  onOtpChange(e: any) {
    if (e.length > 3) {
      this.otpSubmit = true;
      const params = {
        otp: +e,
        email : localStorage.getItem('user-email')
      }
      this._as.otpChecker('/otpChecker', params).subscribe((next: any) => {
        if(next && !next.error){

          this.invalidOtp = false;
          setTimeout(() => {
            this.Signin()
            this.numberSubmit = false;
            this._as.obNotify({
              start: true,
              code: 200,
              status: 'success',
              message: next.message
            })
            localStorage.setItem('user',JSON.stringify(next.response));
            localStorage.setItem('logged_in','true');
            this._as.loggedIn(true)
            this.router.navigate(['/create-profile']);
            this.dialog.closeAll();

          }, 2000);
        }
        else{
          this.invalidOtp = true;
          setTimeout(() => {
            this.otpSubmit = false;
            this._as.obNotify({
              start: true,
              code: 200,
              status: 'error',
              message: next.message
            })
          }, 2000);
          console.log("Invalid OTP");
          
        }
      })
    }
    else {
      this.invalidOtp = true;
    }
  }

  keyValue(e: any) {
    if (((e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode === 8)) {
      // DO NOTHING 
    }
    else {
      e.preventDefault();
    }
  }





  signInwithEmail(data:any){
    let params = {
      email : data.email
    };
        this._as.signIn('/signIn', params).subscribe((next: any) => {
      if (next && !next.error) {
        this.numberSubmit = true;
        localStorage.setItem('user-email',params['email'])
        this._as.obNotify({
          start: true,
          code: 200,
          status: 'success',
          message: next.message
        })
      }
      else {
        this.numberSubmit = false;
        this._as.obNotify({
          start: true,
          code: 200,
          status: 'error',
          message: next.message
        })
      }
    })
  }


  signupWithEmail(user:any){
    let params = {
      name : user.name,
      email : user.email,
      contact: user['contact'] || '',
      password: user['password'] || '',
      address: user.address || '',
      checkbox: user['checkbox'] || ''
    };
    console.log(user,params);
    
      this._as.signUp('/signup', params).subscribe((next: any) => {
      if (next && !next.error) {
        localStorage.setItem('user-email',params['email'])
        this.numberSubmit = true;
        this._as.obNotify({
          start: true,
          code: 200,
          status: 'success',
          message: next.message
        })
      }
      else {
        this.numberSubmit = false;
        this._as.obNotify({
          start: true,
          code: 200,
          status: 'error',
          message: next.message
        })
      }
    })
  }


}
