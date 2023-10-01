import { Component, OnInit, Inject, HostListener } from '@angular/core';
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
mobile:boolean;
filtersLoaded:boolean = false;
videosLoaded:boolean = false;
selectedButton:number = 1;
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


  @HostListener('window:resize',['$event'])
    checkScreenSize(){
      if(window.innerWidth<=768){
        this.mobile = true;
      }
      else{
        this.mobile = false;
      }
    }

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
    this.checkScreenSize();
    this.getFilters();
    this.validation();
    this.getVideos('allVideos');
    // this.getPexelsVideo();
    

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

  getVideos(filter:any){
    this.videosLoaded = false;
    this.selectedButton = filter == 'latest' ? 1 : filter == 'trending' ? 3 : 2;
    let params = {
      filter:{
        experts:[],
        countries:[],
        parameters:[],
        latest:filter=='latest' ? 1 : 0,
        trending:filter=='trending' ? 1 : 0
      }
    }
    this._api.getvideos('/catalogue/videos',params).subscribe((res:any)=>{
      console.log(res);
      this.videosLoaded = true;
      this.pexelVideos = res.response;
      console.log(this.pexelVideos);
      localStorage.setItem('videos',JSON.stringify(this.pexelVideos))
      this.videosLoaded = true;
    })
  }

  getFilters(){
    this._api.getFilters('/static/data?type=parameter').subscribe((res:any)=>{
      if(res && !res.error){
        this.Filters[0].value = res.response;
      } 
    })
    this._api.getFilters('/static/data?type=country').subscribe((res:any)=>{
      if(res && !res.error){
        this.Filters[1].value = res.response;
        setTimeout(() => {
          for(let i=0;i<this.Filters.length;i++){
            (this.sidebarForm.get('filters') as FormArray).push(this.addDummyControl());
            for(let j=0;j<this.Filters[i].value.length;j++){
              this.addFormControl((this.sidebarForm.get('filters') as FormArray).get(i.toString()) as FormGroup,this.Filters[i].value[j].name)
            };
            ((this.sidebarForm.get('filters') as FormArray).get(i.toString()) as FormGroup).removeControl('dummy')
          }
          this.filtersLoaded = true;
        }, 1000);
      }
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
      this.pexelVideos = this.pexelVideos.map(video => {
        video['title'] = "Exploring nature's beauty";
        video['description'] = 'This video shows you the beauty of nature.';
        return video;
      });
      console.log(this.pexelVideos);
    localStorage.setItem('videos',JSON.stringify(this.pexelVideos))
      
    })
  }


  selectFilter(filter:any,index:any){
    console.log(filter)
      this.dialog.open(singleFIlterComponent,{
       data : {
        filter:filter,
        formGroup:(this.sidebarForm.get('filters').get(index.toString()) as FormGroup)
       },
       width:'300px',
       height:'300px'
       
      })
  }

}


@Component({
  selector : 'app-catalogue',
  templateUrl : './singleFilter.html',
  styleUrls : ['./catalogue.component.scss']
})

export class singleFIlterComponent implements OnInit {
   
  constructor(@Inject(MAT_DIALOG_DATA) public data){
    
  }  
  ngOnInit(): void {
      console.log("Hello from watchVideo",this.data);
      console.log(this.data);
      this.data.filter.formGroup as FormGroup;
      console.log(this.data);
      console.log(this.data.formGroup.value);
      
      // for(let i = 0;i<this.data.filter.value.length;i++){
      //   this.addFormControl(this.data.filter.formGroup,this.data.filter.value[i].name)
      // }
      // console.log(this.data.filter);
      
      
  }

  addFormControl(formGroup,formControl){
    formGroup.addControl(formControl, new FormControl(''));
  }
}