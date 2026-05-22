import { UsuariosInterface } from "../../interfaces/usuarios.interface";

export interface ModalUsuarioConfigInterface {
  visible: boolean;
  titulo: string;
  usuario: UsuariosInterface | null;
  modo: 'crear' | 'editar' | 'eliminar';
}