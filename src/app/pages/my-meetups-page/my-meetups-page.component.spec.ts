import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMeetupsPageComponent } from './my-meetups-page.component';

describe('MyMeetupsPageComponent', () => {
  let component: MyMeetupsPageComponent;
  let fixture: ComponentFixture<MyMeetupsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyMeetupsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyMeetupsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
