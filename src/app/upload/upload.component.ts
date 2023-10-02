import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
progress:number = 0;
uploading:boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  handleInput(e:any){
    console.log(e);
    
  }

}
