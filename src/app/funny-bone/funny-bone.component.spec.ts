import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FunnyBoneComponent } from './funny-bone.component';

describe('FunnyBoneComponent', () => {
  let component: FunnyBoneComponent;
  let fixture: ComponentFixture<FunnyBoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FunnyBoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FunnyBoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
