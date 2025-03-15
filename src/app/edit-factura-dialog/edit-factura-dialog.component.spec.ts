import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFacturaDialogComponent } from './edit-factura-dialog.component';

describe('EditFacturaDialogComponent', () => {
  let component: EditFacturaDialogComponent;
  let fixture: ComponentFixture<EditFacturaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditFacturaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFacturaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
