import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFacturaComponent } from './lista-facturas.component';

describe('ListaFacturasComponent', () => {
  let component: ListaFacturaComponent;
  let fixture: ComponentFixture<ListaFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
