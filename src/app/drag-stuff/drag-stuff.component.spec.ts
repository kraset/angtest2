import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragStuffComponent } from './drag-stuff.component';

describe('DragStuffComponent', () => {
  let component: DragStuffComponent;
  let fixture: ComponentFixture<DragStuffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragStuffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragStuffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
