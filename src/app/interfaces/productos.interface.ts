export interface ProductosInterface {
  idProducto?: number | null;
  descripcion: string;
  idCategoria: number;
  precioUnitario: number;
  stock: number;
  codigo: string;
  idMarca: number;
  activo?: boolean,
image?: string | null;
}