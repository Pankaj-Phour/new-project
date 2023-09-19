import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  constructor(private _fb:FormBuilder) { }

  ngOnInit(): void {
    this.validation();
    this.ParameterValidation();
    this.CountryValidation();
    this.ExpertValidation();
  }

  validation(){
    this.sidebarForm = this._fb.group({
      searchValue: ['']
    })
  }

  ParameterValidation(){
    this.Parameter = this._fb.group({
      1:[''],
      2:[''],
      3:[''],
      4:[''],
      5:[''],
      6:['']
    })
  }
  CountryValidation(){
    this.Country = this._fb.group({
      USA:[''],
      Canada:[''],
      UK:[''],
      Germany:[''],
      France:['']
    })
  }
  ExpertValidation(){
    this.Expert = this._fb.group({
      Expert_A:[''],
      Expert_B:[''],
      Expert_C:[''],
      Expert_D:[''],
      Expert_E:['']
    })
  }



}
