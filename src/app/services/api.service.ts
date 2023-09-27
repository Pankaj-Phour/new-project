import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
headers = new HttpHeaders();
  constructor(private http:HttpClient) { 
    this.headers = this.headers.append('Authorization',environment.token);
    // this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
  }

  //  ***************************************** Behaviour subjects to pass data from one component to another *****************************************

  private _notify = new BehaviorSubject<any>({status: 'success', message: 'message', start: false, code: 200});
  notify$ = this._notify.asObservable();



  // ***************************************** Event Emitters to pass data from one component to another instantly ***************************************** 

  @Output() loginClickeEmitter = new EventEmitter();
  loginClicked(data){
    this.loginClickeEmitter.emit(data)
  }


  @Output() changeSelectedVideoEmitter = new EventEmitter();
  changeSelectedVideo(data){
    this.changeSelectedVideoEmitter.emit(data)
  }

  @Output() loggedInEmitter = new EventEmitter();
  loggedIn(data){
    this.loggedInEmitter.emit(data)
  }

  @Output() addCommentEmitter = new EventEmitter();
  addComment(data){
    this.addCommentEmitter.emit(data)
  }


  // ***************************************** Common functions to be used by different components  ***************************************** 
  
  obNotify(data: any): void {
    this._notify.next(data);
  }



  // ***************************************** Functions to be used  for calling ApiService   *****************************************

  signUp(endpoint:any,params:any){
    return this.http.post(environment.URL + endpoint,params)
  }

  signIn(endpoint:any,params:any){
   return  this.http.post(environment.URL + endpoint,params)
  }

  otpChecker(endpoint:any,params:any){
    return this.http.post(environment.URL + endpoint,params)
  }

  getvideos(endpoint:any,params:any){
    return this.http.post(environment.AshwaniApi + endpoint,params)
  }

  getFilters(endpoint:any){
    return this.http.get(environment.AshwaniApi + endpoint)
  }

  pexelsVideos(endpoint:any){
    return this.http.get(environment.URL + endpoint,{headers:this.headers})
  }
}
