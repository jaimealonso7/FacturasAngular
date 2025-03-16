import { Component, OnInit, Renderer2 } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { EditFacturaDialogComponent } from '../edit-factura-dialog/edit-factura-dialog.component'; // Import the dialog component
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { FormsModule } from '@angular/forms';
import Factura from '../interfaces/facturas.interfaz';
import { FacturasService } from '../services/facturas.service';

@Component({
  selector: 'app-lista-facturas',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatDialogModule, FormsModule], // Import MatDialogModule
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})

export class ListaFacturaComponent implements OnInit {

  estiloImagenesFacturas: any;

  // Definir la propiedad factura con inicialización explícita
  factura: Factura = {
    numeroFactura: 0,
    baseImponible: 0,
    direccion: '',
    empresa: '',
    fechaEmision: new Date(),
    id: '',
    iva: 0,
    nif: '',
    total: 0,
    imagen: undefined
  };

  facturas: Factura[];

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

  constructor( private renderer: Renderer2,
    private dialog: MatDialog, private facturasService: FacturasService
  ) {
    this.facturas = [{
      numeroFactura: 123,
      baseImponible: 0,
      direccion: '',
      empresa: '',
      fechaEmision: new Date(2024, 3, 12),
      id: '',
      iva: 21,
      nif: '',
      total: 120,
      imagen: 'assets/img/Factura.jpg'
    }];
  }

  ngOnInit(): void {
    this.renderer.setStyle(document.body, 'background-color', '#ffffff'); // Fondo blanco
    this.renderer.setStyle(document.body, 'color', '#000'); // Texto negro
    this.facturasService.getFacturas().subscribe(facturas => {
      this.facturas = facturas.map(factura => ({
        ...factura,
        id: factura.id || '',
        imagen: factura.imagen ? factura.imagen : 'assets/img/Factura.jpg' // Imagen por defecto si no tiene una
      }));
      console.log('Facturas cargadas con imágenes:', this.facturas);
    }, error => {
      console.error('Error al obtener las facturas:', error);
    });
  }

  logOut(): void {}

  eliminarFactura(factura: Factura) {
    if (!factura || !factura.id) {
      console.error('Error: Factura inválida o sin ID', factura);
      return;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Seguro que quieres eliminar la factura?' },
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamar al servicio para eliminar la factura de la base de datos
        this.facturasService.deleteFactura(factura.id!).then(() => {
          // Si la eliminación en la base de datos es exitosa, eliminarla del arreglo local
          this.facturas = this.facturas.filter(f => f.id !== factura.id);
          console.log('Factura eliminada de la base de datos y del arreglo local:', factura);
        }).catch(error => {
          console.error('Error al eliminar la factura de la base de datos:', error);
        });
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

  editarFactura(factura: Factura) {
    const dialogRef = this.dialog.open(EditFacturaDialogComponent, {
      width: '400px',
      data: { ...factura } // Pasar los datos de la factura al diálogo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualiza la factura en el arreglo de facturas
        const index = this.facturas.findIndex(f => f.numeroFactura === result.numeroFactura);
        if (index !== -1) {
          this.facturas[index] = result; // Actualiza la factura editada
        }

        // Actualiza la factura en firebase
        this.facturasService.updateFactura(result).then(() => {
          console.log('Factura actualizada corectamente en firebase');
        }).catch(error => {
          console.error('Error al actualizar la factura en Firebase:', error);
        })
      }
    });
  }

  async enviarFormulario() {
    if (this.factura.numeroFactura) {
      this.factura.id = this.generateId(); // Generar un ID único para la nueva factura
  
      if (!this.factura.imagen) {
        this.factura.imagen = 'assets/img/Factura.jpg'; // Imagen por defecto
      }
  
      try {
        // Agregar factura a Firestore usando el servicio
        await this.facturasService.addFacturas({ ...this.factura });
  
        console.log('Factura añadida a Firestore:', this.factura);
  
        // Recargar la lista de facturas después de agregar una nueva
        this.facturasService.getFacturas().subscribe(facturas => {
          this.facturas = facturas;
        });
  
        this.resetForm(); // Resetea el formulario
      } catch (error) {
        console.error('Error al agregar la factura:', error);
      }
    }
  }
  

  resetForm() {
    // Resetea los campos del formulario (se restablece solo la propiedad 'factura')
    this.factura = {
      numeroFactura: 0,
      baseImponible: 0,
      direccion: '',
      empresa: '',
      fechaEmision: new Date(),
      id: '',
      iva: 0,
      nif: '',
      total: 0,
      imagen: undefined
    };
  }

  generateId() {
    return 'ID-' + Math.random().toString(36).substr(2, 9); // Generar un ID aleatorio
  }
}
