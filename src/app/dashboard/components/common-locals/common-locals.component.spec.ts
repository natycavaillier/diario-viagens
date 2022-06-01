import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonLocalsComponent } from './common-locals.component';

describe('CommonLocalsComponent', () => {
  let component: CommonLocalsComponent;
  let fixture: ComponentFixture<CommonLocalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonLocalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonLocalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
