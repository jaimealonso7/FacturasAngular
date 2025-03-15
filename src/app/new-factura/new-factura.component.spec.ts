import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFacturaComponent } from './new-factura.component';

describe('NewFacturaComponent', () => {
  let component: NewFacturaComponent;
  let fixture: ComponentFixture<NewFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
