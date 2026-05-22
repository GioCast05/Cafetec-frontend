export interface UsuariosInterface {
  idUsuario?: number | null;
  nombre: string;
  correo: string;
  password?: string;
  rol: string;
  activo?: number;
}