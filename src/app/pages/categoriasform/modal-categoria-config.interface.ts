import { CategoriasInterface } from '../../interfaces/categorias.interface';

export interface ModalCategoriaConfigInterface {
  visible: boolean;
  titulo: string;
  categoria: CategoriasInterface | null;
  modo: 'crear' | 'editar' | 'eliminar';
}