import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGdComponentComponent } from './ng-gd-component.component';

describe('NgGdComponentComponent', () => {
  let component: NgGdComponentComponent;
  let fixture: ComponentFixture<NgGdComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgGdComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgGdComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
