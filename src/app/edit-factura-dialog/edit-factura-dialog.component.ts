import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-factura-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './edit-factura-dialog.component.html',
  styleUrls: ['./edit-factura-dialog.component.css']
})
export class EditFacturaDialogComponent {

  calcularTotal() {
    const baseImponible = this.factura.baseImponible;
    const iva = this.factura.iva;
  
    // Validar que la base imponible y el IVA sean números y mayores que cero
    if (baseImponible > 0 && iva >= 0) {
      this.factura.total = baseImponible + (baseImponible * iva / 100);
    } else {
      this.factura.total = 0;
    }
  }

  constructor(
    public dialogRef: MatDialogRef<EditFacturaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public factura: any
  ) {}

  saveChanges() {
    this.dialogRef.close(this.factura); // Return updated factura
  }

  cancel() {
    this.dialogRef.close();
  }
}
