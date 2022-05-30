import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioEditComponent } from './diario-edit.component';

describe('DiarioEditComponent', () => {
  let component: DiarioEditComponent;
  let fixture: ComponentFixture<DiarioEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
