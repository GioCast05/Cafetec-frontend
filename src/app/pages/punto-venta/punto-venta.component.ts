import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { CategoriasService } from '../../services/categorias.service';
import { ProductosInterface } from '../../interfaces/productos.interface';
import { CategoriasInterface } from '../../interfaces/categorias.interface';
import { CarritoInterface } from '../../interfaces/carrito.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-punto-venta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './punto-venta.component.html',
  styleUrl: './punto-venta.component.css',
})
export class PuntoVentaComponent implements OnInit {

  private productoService = inject(ProductosService);
  private categoriaService = inject(CategoriasService);

  public listaProductos: ProductosInterface[] = [];
  public listaCategorias: CategoriasInterface[] = [];
  public articulosCar: CarritoInterface[] = [];
  
  public selectCategoria = 'todos';

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(): void {
    this.mostrarCategorias();
    this.mostrarProductos();
  }

  mostrarProductos(): void {
    this.productoService.obtenerProductos(1, 50).subscribe({
      next: (response) => {
        if (response.status) {
          this.listaProductos = response.data.productos;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        if (err.error && !err.error.status) {
          alert(err.error.message);
          return;
        }
        alert('Error al cargar productos');
      }
    });
  }
  
  mostrarCategorias(): void {
    this.categoriaService.obtenerCategorias(1, 100).subscribe({
      next: (response) => {
        if (response.status) {
          this.listaCategorias = response.data.categorias;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        if (err.error && !err.error.status) {
          alert(err.error.message);
          return;
        }
        alert('Error al cargar categorias');
      }
    });
  }

  seleccionarCategoria(seleccion: string): void {
    this.selectCategoria = seleccion;
    // Aquí puedes añadir lógica en el futuro para filtrar localmente o llamar a tu API por categoría
  }

  agregarAlCarrito(producto: ProductosInterface): void {
    // Buscar si el producto ya está en el carrito
    const itemExistente = this.articulosCar.find(item => item.producto.idProducto === producto.idProducto);

    if (itemExistente) {
      itemExistente.cantidad += 1;
    } else {
      // Si es nuevo, lo empujamos cumpliendo con la estructura de CarritoInterface
      this.articulosCar.push({
        producto: producto,
        cantidad: 1
      });
    }
    this.cd.detectChanges();
  }

  actualizarCantidad(item: CarritoInterface, cambio: number): void {
    item.cantidad += cambio;
    if (item.cantidad <= 0) {
      this.eliminarItemCarrito(item);
    }
    this.cd.detectChanges();
  }

  eliminarItemCarrito(item: CarritoInterface): void {
    this.articulosCar = this.articulosCar.filter(i => i.producto.idProducto !== item.producto.idProducto);
    this.cd.detectChanges();
  }

  vaciarCarrito(): void {
    this.articulosCar = [];
    this.cd.detectChanges();
  }

  obtenerTotal(): number {
    return this.articulosCar.reduce((total, item) => total + (item.producto.precioUnitario * item.cantidad), 0);
  }

  formatoPrecio(precio: number): string {
    return `$${precio.toFixed(2)}`;
  }
}