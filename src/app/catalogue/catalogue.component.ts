import { Component, OnInit, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  sidebarForm:FormGroup;
  Parameter:FormGroup;
  Country:FormGroup;
  Expert:FormGroup;
filterNames:any = ['Parameter','Country','Expert'];
selectedFilters:any = [];
pexelVideos:any = [];
  Filters: any = [
    {
      type: 'Parameter',
      value: [
        {name:1},
        {name:2},
        {name:3},
        {name:4},
        {name:5},
        {name:6}
      ]
    },
    {
      type: 'Country',
      value: [
        {name:'USA'},
        {name:'Canada'},
        {name:'UK'},
        {name:'Germany'},
        {name:'France'}
      ]
    },
    {
      type: 'Expert',
      value: [
        {name:'Expert_A'},
        {name:'Expert_B'},
        {name:'Expert_C'},
        {name:'Expert_D'},
        {name:'Expert_E'}

      ]
    }
  ]
  constructor(private _fb:FormBuilder,private _api:ApiService, private dialog:MatDialog) { }

  //  Function for the validation of the form and registering the formControl and FormArray  
  validation(){
    this.sidebarForm = this._fb.group({
      searchValue: [''],
      filters:this._fb.array([])
    })
  }

  // Function to register the dummy controls in the formGroups ( basically used to register our formGroups in the formArray)
  addDummyControl(){
    return this._fb.group({
      dummy: ['']
    })
  }

  // Function to add the formControls to the Formgroups 
  addFormControl(formGroup,formControl){
    formGroup.addControl(formControl, new FormControl(''));
  }

  ngOnInit(): void {
    this.validation();
    // this.getVideos();
    this.getPexelsVideo();
    for(let i=0;i<this.Filters.length;i++){
      (this.sidebarForm.get('filters') as FormArray).push(this.addDummyControl());
      for(let j=0;j<this.Filters[i].value.length;j++){
        this.addFormControl((this.sidebarForm.get('filters') as FormArray).get(i.toString()) as FormGroup,this.Filters[i].value[j].name)
      };
      ((this.sidebarForm.get('filters') as FormArray).get(i.toString()) as FormGroup).removeControl('dummy')
    }
    

    this.sidebarForm.valueChanges.subscribe((value:any)=>{
      for(let i=0;i<value.filters.length;i++){
        this.selectedFilters[i] = [];
        let keys = Object.keys(value.filters[i]);
        keys.map((key:any)=>{
          if(value.filters[i][key]){
            this.selectedFilters[i].push(key)
          }
        })
      }
    })
    
  }


  // Function to remove the mat-chip of the filter and also changing the value of the targeted filter 
  removeKeyword(parent:any,value:any){
    ((this.sidebarForm.get('filters') as FormArray).get(parent.toString()) as FormGroup).get(value.toString()).setValue('');
  }

  getVideos(){
    let params = {
      expert:[],
      country:[],
      parameter:[]
    }
    this._api.getvideos('/videos',params).subscribe((data:any)=>{
      console.log(data);
      
    })
  }

  getPexelsVideo(){
    // this._api.pexelsVideos('?query=nature').subscribe((response:any)=>{
    this._api.pexelsVideos('/pexelVideos').subscribe((res:any)=>{
      // for(let i = 0;i<response.videos.length;i++){
      //   response.videos[i].video_files.map((file:any)=>{
      //     if(file.height > 250 && file.height < 450){
      //       this.pexelVideos.push({video:file,image:response.videos[i].image});
      //     }
      //   })
      // }
      this.pexelVideos = res.response;
      console.log(this.pexelVideos);
      
    })
  }


  watchVideo(video:any){
    console.log(video)
    
      this.dialog.open(watchVideoComponent,{
       data : video.link
       
      })
  }

}


@Component({
  selector : 'app-catalogue',
  templateUrl : './watchVideo.html',
  styleUrls : ['./catalogue.component.scss']
})

export class watchVideoComponent implements OnInit {
   
  constructor(@Inject(MAT_DIALOG_DATA) public data){
    
  }  
  ngOnInit(): void {
      // console.log("Hello from watchVideo",this.data);
      
  }
}