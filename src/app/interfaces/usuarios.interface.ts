export interface UsuariosInterface {
  idUsuario?: number | null;
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  username: string;
  password?: string;
  activo?: number;
}