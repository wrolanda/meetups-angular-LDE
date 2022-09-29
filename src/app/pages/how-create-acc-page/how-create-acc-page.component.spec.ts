import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowCreateAccPageComponent } from './how-create-acc-page.component';

describe('HowCreateAccPageComponent', () => {
  let component: HowCreateAccPageComponent;
  let fixture: ComponentFixture<HowCreateAccPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowCreateAccPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HowCreateAccPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
