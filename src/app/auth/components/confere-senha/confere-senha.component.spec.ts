import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfereSenhaComponent } from './confere-senha.component';

describe('ConfereSenhaComponent', () => {
  let component: ConfereSenhaComponent;
  let fixture: ComponentFixture<ConfereSenhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfereSenhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfereSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
