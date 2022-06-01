import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekPostsComponent } from './week-posts.component';

describe('WeekPostsComponent', () => {
  let component: WeekPostsComponent;
  let fixture: ComponentFixture<WeekPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
