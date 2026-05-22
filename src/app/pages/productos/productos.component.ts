import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductosInterface } from '../../interfaces/productos.interface';
import { ProductosformComponent } from '../productosform/productosform.component';
import { ModalProductoConfigInterface } from '../productosform/modal-producto-config.interface';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductosformComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent implements OnInit {
  private productosService = inject(ProductosService);
  public listaProductos: ProductosInterface[] = [];
  public modalConfig: ModalProductoConfigInterface = {
    visible: false,
    titulo: '',
    producto: null,
    modo: 'crear'
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.mostrarProductos();
  }

  mostrarProductos(): void {
    this.productosService.obtenerProductos(1, 10).subscribe({
      next: (response) => {
        if (response.status) {
          this.listaProductos = response.data.productos;
          this.cd.detectChanges();
        }
      }
    });
  }

  accionProducto(data: ProductosInterface): void {
    if (this.modalConfig.modo === 'crear') {
      this.productosService.crearProductos(data).subscribe({
        next: (res) => { if (res.status) this.mostrarProductos(); }
      });
    } else if (this.modalConfig.modo === 'editar') {
      this.productosService.actualizarProductos(data).subscribe({
        next: (res) => { if (res.status) this.mostrarProductos(); }
      });
    } else if (this.modalConfig.modo === 'eliminar') {
      this.productosService.eliminarProducto(data).subscribe({
        next: (res) => { if (res.status) this.mostrarProductos(); }
      });
    }
  }

  editarProducto(prod: ProductosInterface): void {
    this.modalConfig = { visible: true, titulo: 'Editar Producto', producto: prod, modo: 'editar' };
  }

  nuevoProducto(): void {
    this.modalConfig = { visible: true, titulo: 'Nuevo Producto', producto: null, modo: 'crear' };
  }

  eliminarProducto(prod: ProductosInterface): void {
    this.modalConfig = { visible: true, titulo: 'Eliminar Producto', producto: prod, modo: 'eliminar' };
  }

  cerrarModal(): void {
    this.modalConfig.visible = false;
  }
}