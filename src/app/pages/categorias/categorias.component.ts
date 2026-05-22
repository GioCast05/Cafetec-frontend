import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';
import { CategoriasInterface } from '../../interfaces/categorias.interface';
import { CategoriasformComponent } from '../categoriasform/categoriasform.component';
import { ModalCategoriaConfigInterface } from '../categoriasform/modal-categoria-config.interface';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, CategoriasformComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  private categoriasService = inject(CategoriasService);
  public listaCategorias: CategoriasInterface[] = [];

  public modalConfig: ModalCategoriaConfigInterface = {
    visible: false,
    titulo: '',
    categoria: null,
    modo: 'crear'
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.mostrarCategorias();
  }

  mostrarCategorias(): void {
    this.categoriasService.obtenerCategorias(1, 10).subscribe({
      next: (response) => {
        if (response.status) {
          this.listaCategorias = response.data.categorias;
          this.cd.detectChanges();
        }
      },
      error: (err) => {
        if (!err.error?.status) {
          alert(err.error?.message || 'Error al cargar categorías');
          return;
        }
        alert('Error al cargar categorías');
      }
    });
  }

  accionCategoria(data: CategoriasInterface): void {
    if (this.modalConfig.modo === 'crear') {
      this.categoriasService.crearCategorias(data).subscribe({
        next: (response) => {
          if (response.status) {
            alert('Categoría almacenada correctamente');
            this.mostrarCategorias();
          }
        },
        error: (err) => {
          if (!err.error?.status) {
            alert(err.error?.message || 'Error al guardar la categoría');
            return;
          }
          alert('Error al guardar la categoría');
        }
      });

    } else if (this.modalConfig.modo === 'editar') {
      this.categoriasService.actualizarCategorias(data).subscribe({
        next: (response) => {
          if (response.status) {
            alert('Categoría actualizada correctamente');
            this.mostrarCategorias();
          }
        },
        error: (err) => {
          if (!err.error?.status) {
            alert(err.error?.message || 'Error al actualizar la categoría');
            return;
          }
          alert('Error al actualizar la categoría');
        }
      });

    } else if (this.modalConfig.modo === 'eliminar') {
      this.categoriasService.eliminarCategoria(data).subscribe({
        next: (response) => {
          if (response.status) {
            alert('Categoría eliminada correctamente');
            this.mostrarCategorias();
          }
        },
        error: (err) => {
          if (!err.error?.status) {
            alert(err.error?.message || 'Error al eliminar la categoría');
            return;
          }
          alert('Error al eliminar la categoría');
        }
      });
    }
  }

  editarCategoria(cat: CategoriasInterface): void {
    this.modalConfig = { 
      visible: true, 
      titulo: 'Editar Categoría', 
      categoria: cat, 
      modo: 'editar' 
    };
  }

  nuevaCategoria(): void {
    this.modalConfig = { 
      visible: true, 
      titulo: 'Nueva Categoría', 
      categoria: null, 
      modo: 'crear' 
    };
  }

  eliminarCategoria(cat: CategoriasInterface): void {
    this.modalConfig = { 
      visible: true, 
      titulo: 'Eliminar Categoría', 
      categoria: cat, 
      modo: 'eliminar' 
    };
  }

  cerrarModal(): void {
    this.modalConfig.visible = false;
  }
}