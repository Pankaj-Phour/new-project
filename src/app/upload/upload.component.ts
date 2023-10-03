import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
progress:number = 0;
uploading:boolean = false;
dragZoneActive:boolean = false;
file:any;
  constructor() { }

  onDrop(event: any): void {
    console.log("Hello from drop function",event)
    event.preventDefault();
    event.stopPropagation();
    this.dragZoneActive = false;
    this.handleInput(event);
  }

  onDragOver(evt): void {
    console.log("Hello from dragover function")
    evt.preventDefault();
    evt.stopPropagation();
    evt.dataTransfer.dropEffect = "move";
    this.dragZoneActive = true;
  }
  onDragLeave(evt): void {
    console.log("Hello from drag leave function")
    evt.preventDefault();
    evt.stopPropagation();
    this.dragZoneActive = false;
  }

  preventDragNDrop() {
    this.dragZoneActive = false;
    window.addEventListener(
      "dragover",
      function (e) {
        console.log(e);
        
        // e.preventDefault();
        // e.dataTransfer.effectAllowed = "none";
        // e.dataTransfer.dropEffect = "none";
      },
      false
    );
    window.addEventListener(
      "drop",
      function (e) {
        console.log(e);
        
        // e.preventDefault();
        // e.dataTransfer.effectAllowed = "none";
        // e.dataTransfer.dropEffect = "none";
      },
      false
    );
  }

  ngOnInit(): void {
    this.preventDragNDrop();
  }

  handleInput(e:any){
    console.log(e);
    this.file = e ? e.dataTransfer ? e.dataTransfer.files[0] : e.target ? e.target.files[0] : e : '';
    console.log("Checking file",this.file);
    
  }

}
