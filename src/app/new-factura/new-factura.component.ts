import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FacturasService } from '../services/facturas.service';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './new-factura.component.html',
  styleUrl: './new-factura.component.css'
})
export class NewFacturaComponent implements OnInit{
factura: any;
calcularTotal() {
throw new Error('Method not implemented.');
}
guardarFactura() {
throw new Error('Method not implemented.');
}
cancelar() {
throw new Error('Method not implemented.');
}

  formulario: FormGroup;

  constructor(
    private facturasService: FacturasService
  ) {
    this.formulario = new FormGroup({
      numeroFactura: new FormControl(),
      fechaEmision: new FormControl(),
      empresa: new FormControl(),
      nif: new FormControl(),
      direccion: new FormControl(),
      baseImponible: new FormControl(),
      iva: new FormControl(),
      total: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  async onSubmit() {
    console.log(this.formulario.value);
    const response = await this.facturasService.addFacturas(this.formulario.value);
    console.log(response);
  }


}
