import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglescreenComponent } from './singlescreen.component';

describe('SinglescreenComponent', () => {
  let component: SinglescreenComponent;
  let fixture: ComponentFixture<SinglescreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglescreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SinglescreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
