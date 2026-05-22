import { ProductosInterface } from "../../interfaces/productos.interface";

export interface ModalProductoConfigInterface {
  visible: boolean;
  titulo: string;
  producto: ProductosInterface | null;
  modo: 'crear' | 'editar' | 'eliminar';
}