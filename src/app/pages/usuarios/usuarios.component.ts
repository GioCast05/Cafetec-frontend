import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { UsuariosInterface } from '../../interfaces/usuarios.interface';
import { UsuariosformComponent } from '../usuariosform/usuariosform.component';
import { ModalUsuarioConfigInterface } from '../usuariosform/modal-usuario-config.interface';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, UsuariosformComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent implements OnInit {
  private usuariosService = inject(UsuariosService);
  public listaUsuarios: UsuariosInterface[] = [];
  public modalConfig: ModalUsuarioConfigInterface = {
    visible: false,
    titulo: '',
    usuario: null,
    modo: 'crear'
  };

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.mostrarUsuarios();
  }

  mostrarUsuarios(): void {
    this.usuariosService.obtenerUsuarios(1, 10).subscribe({
      next: (response) => {
        if (response.status) {
          this.listaUsuarios = response.data.usuarios;
          this.cd.detectChanges();
        }
      }
    });
  }

  accionUsuario(data: UsuariosInterface): void {
    if (this.modalConfig.modo === 'crear') {
      this.usuariosService.crearUsuarios(data).subscribe({
        next: (res) => { if (res.status) this.mostrarUsuarios(); }
      });
    } else if (this.modalConfig.modo === 'editar') {
      this.usuariosService.actualizarUsuarios(data).subscribe({
        next: (res) => { if (res.status) this.mostrarUsuarios(); }
      });
    } else if (this.modalConfig.modo === 'eliminar') {
      this.usuariosService.eliminarUsuario(data).subscribe({
        next: (res) => { if (res.status) this.mostrarUsuarios(); }
      });
    }
  }

  editarUsuario(user: UsuariosInterface): void {
    this.modalConfig = { visible: true, titulo: 'Editar Usuario', usuario: user, modo: 'editar' };
  }

  nuevoUsuario(): void {
    this.modalConfig = { visible: true, titulo: 'Nuevo Usuario', usuario: null, modo: 'crear' };
  }

  eliminarUsuario(user: UsuariosInterface): void {
    this.modalConfig = { visible: true, titulo: 'Eliminar Usuario', usuario: user, modo: 'eliminar' };
  }

  cerrarModal(): void {
    this.modalConfig.visible = false;
  }
}