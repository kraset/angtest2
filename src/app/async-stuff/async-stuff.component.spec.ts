import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncStuffComponent } from './async-stuff.component';

describe('AsyncStuffComponent', () => {
  let component: AsyncStuffComponent;
  let fixture: ComponentFixture<AsyncStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsyncStuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
