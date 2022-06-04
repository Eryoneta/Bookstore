import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyListNavComponent } from './my-list-nav.component';

describe('MyListNavComponent', () => {
  let component: MyListNavComponent;
  let fixture: ComponentFixture<MyListNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyListNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyListNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
