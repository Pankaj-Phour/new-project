import { Component, OnInit, Renderer2 } from '@angular/core';

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
video:any;
  constructor(private renderer:Renderer2) { }

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


  ngOnInit(): void {
  }

  handleInput(e:any){
    console.log(e);
    this.file = e ? e.dataTransfer ? e.dataTransfer.files[0] : e.target ? e.target.files[0] : e : '';
    console.log("Checking file",this.file);
    this.video = this.file;
    
    
  }

}
