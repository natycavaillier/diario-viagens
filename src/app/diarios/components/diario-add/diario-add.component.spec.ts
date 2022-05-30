import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioAddComponent } from './diario-add.component';

describe('DiarioAddComponent', () => {
  let component: DiarioAddComponent;
  let fixture: ComponentFixture<DiarioAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
