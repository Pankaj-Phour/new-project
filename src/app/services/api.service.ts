
import {HttpClient, HttpHeaders, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { catchError, last, map, tap } from 'rxjs/operators';
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

  public _progress = new BehaviorSubject<any>(0);
  progress$ = this._progress.asObservable();

  // ***************************************** Event Emitters to pass data from one component to another instantly ***************************************** 

  @Output() loginClickeEmitter = new EventEmitter();
  loginClicked(data:any){
    this.loginClickeEmitter.emit(data)
  }


  @Output() changeSelectedVideoEmitter = new EventEmitter();
  changeSelectedVideo(data:any){
    this.changeSelectedVideoEmitter.emit(data)
  }

  @Output() loggedInEmitter = new EventEmitter();
  loggedIn(data:any){
    this.loggedInEmitter.emit(data)
  }

  @Output() addCommentEmitter = new EventEmitter();
  addComment(data:any){
    this.addCommentEmitter.emit(data)
  }

  @Output() toggleCommentSectionEmitter = new EventEmitter();
  toggleCommentSection(data:any){
    this.toggleCommentSectionEmitter.emit(data)
  }

  @Output() filterLoadEmitter = new EventEmitter();
  filterLoad(data:any){
    this.filterLoadEmitter.emit(data)
  }


  // ***************************************** Common functions to be used by different components  ***************************************** 
  
  obNotify(data: any): void {
    this._notify.next(data);
  }

   obProgress(data: any): void {
    this._progress.next(data);
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

  getComments(endpoint:any){
    return this.http.get(environment.AshwaniApi + endpoint)
  }

  updateComment(endpoint:any,params:any){
    return this.http.post(environment.AshwaniApi + endpoint,params)
  }


  signin(endpoint:any,params:any){
    return this.http.post(environment.AshwaniApi + endpoint,params)
  }

  signup(endpoint:any,params:any){
    return this.http.post(environment.AshwaniApi + endpoint,params)
  }

  pexelsVideos(endpoint:any){
    return this.http.get(environment.URL + endpoint,{headers:this.headers})
  }


  // This function is used to track the progress of the video uploaded to the server
  public uploadContent (userData, endpoint, index) {
    const req = new HttpRequest('POST', environment.AshwaniApi + endpoint, userData, {
      reportProgress: true
    });
    const res = this.http.request(req).pipe(
      map(event => this.getEventMessage(event, userData, index)),
      tap(message => this.showProgress(message, index)),
      last(), // return last (completed) message to caller
      catchError(this.handleError(userData))
    );
    return res;
  }


    /** Return distinct message for sent, upload progress, & response events */
    private getEventMessage(event: HttpEvent<any>, file: any, index) {
      switch (event.type) {
        case HttpEventType.Sent:
          return `Adding asset to your campaign`;
  
        case HttpEventType.UploadProgress:
          // Compute and show the % done:
          return { progress : Math.round(100 * event.loaded / event.total), message: 'Asset Uploading...', index: index };
  
        case HttpEventType.Response:
          return event.body;
  
        default:
          return `Wait for a while till your asset being finalized`;
      }
    }



    private showProgress(message, index) {
      if (message && message.progress && message.progress < 100) {
        this.obProgress({message: message.progress, index: index});
        }
    }

    private handleError(file) {
      return file;
    }
}
