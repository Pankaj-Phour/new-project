import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }


  //  ***************************************** Behaviour subjects to pass data from one component to another *****************************************

  private _notify = new BehaviorSubject<any>({status: 'success', message: 'message', start: false, code: 200});
  notify$ = this._notify.asObservable();



  // ***************************************** Common functions to be used by different components  ***************************************** 
  
  obNotify(data: any): void {
    this._notify.next(data);
  }

  

  // ***************************************** Functions to be used  for calling ApiService   *****************************************

  otpChecker(endpoint:any,params:any){
    return this.http.post(environment.URL + endpoint,params)
  }
}
