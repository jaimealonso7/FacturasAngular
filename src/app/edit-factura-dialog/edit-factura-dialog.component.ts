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
