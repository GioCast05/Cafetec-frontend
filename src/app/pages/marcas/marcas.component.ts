import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { MarcasService } from '../../services/marcas.service';
import { MarcasInterface } from '../../interfaces/marcas.interface';
import { MarcasformComponent } from '../marcasform/marcasform.component';
import { ModalMarcaConfigInterfaceTs } from '../marcasform/modal-marca-config.interface.ts';

@Component({
  selector: 'app-marcas',
  imports: [CommonModule, MarcasformComponent],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.css',
})
export class MarcasComponent {
  private marcasService = inject(MarcasService);
  public listaMarcas: MarcasInterface[] = [];

  public modalConfig: ModalMarcaConfigInterfaceTs = {
    visible: false,
    titulo: '',
    marca: null as MarcasInterface | null,
    modo: 'crear'
  }

  constructor(private cd: ChangeDetectorRef){}

  ngOnInit(): void{
    this.mostrarMarcas();
  }

  mostrarMarcas(): void{
    this.marcasService.obtenerMarcas(1, 10).subscribe({
      next: (response) => {
        if(response.status){
          this.listaMarcas = response.data.marcas;
          this.cd.detectChanges();
        }
      },
      error: (err) =>{
        if(!err.error.status){
          alert(err.error.message);
          return;
        }
        alert('Error al cargar marcas');
      }
    })
  }

  accionMarca(data: MarcasInterface): void{
    if(this.modalConfig.modo === 'crear'){
        this.marcasService.crearMarcas(data).subscribe({
          next: (response) => {
            if(response.status){
              alert('Marca almacenada correctamente');
              this.mostrarMarcas();
            }
          },
          error: (err) =>{
            if(!err.error.status){
              alert(err.error.message);
              return;
            }
            alert('Error al guardar el registro');
          }
        });

    } else if (this.modalConfig.modo === 'editar') {
      this.marcasService.actualizarMarcas(data).subscribe({
        next: (response) => {
          if(response.status){
            alert('Marca actualizada correctamente');
            this.mostrarMarcas();
          }
        },
        error: (err) =>{
          if(!err.error.status){
            alert(err.error.message);
            return;
          }
          alert('Error al actualizar el registro');
        }
      });

    } else if (this.modalConfig.modo === 'eliminar') {
      this.marcasService.eliminarMarca(data).subscribe({
        next: (response) => {
          if(response.status){
            alert('Marca eliminada correctamente');
            this.mostrarMarcas();
          }
        },
        error: (err) => {
          if(!err.error.status){
            alert(err.error.message);
            return;
          }
          alert('Error al eliminar el registro');
        }
      });
    }
  }

  editarMarca(marca: MarcasInterface): void{
    this.modalConfig = {
      visible: true,
      titulo: 'Editar marca',
      marca: marca,
      modo: 'editar'
    }
  }

  nuevaMarca(): void{
    this.modalConfig = {
      visible: true,
      titulo: 'Nueva marca',
      marca: null,
      modo: 'crear'
    }
  }

  eliminarMarca(marca: MarcasInterface): void{
    this.modalConfig = {
      visible: true,
      titulo: 'Eliminar marca',
      marca: marca,
      modo: 'eliminar'
    }
  }

  cerrarModal(): void{
    this.modalConfig.visible = false;
  }
}