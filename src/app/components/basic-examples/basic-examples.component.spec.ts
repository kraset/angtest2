import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicExamplesComponent } from './basic-examples.component';

describe('BasicExamplesComponent', () => {
  let component: BasicExamplesComponent;
  let fixture: ComponentFixture<BasicExamplesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicExamplesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicExamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
