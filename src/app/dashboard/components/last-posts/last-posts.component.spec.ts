import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPostsComponent } from './last-posts.component';

describe('LastPostsComponent', () => {
  let component: LastPostsComponent;
  let fixture: ComponentFixture<LastPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
