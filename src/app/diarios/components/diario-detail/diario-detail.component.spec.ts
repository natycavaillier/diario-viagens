import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioDetailComponent } from './diario-detail.component';

describe('DiarioDetailComponent', () => {
  let component: DiarioDetailComponent;
  let fixture: ComponentFixture<DiarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
