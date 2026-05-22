import { MarcasInterface } from "../../interfaces/marcas.interface";

export interface ModalMarcaConfigInterfaceTs {
    visible: boolean,
    titulo: string,
    marca: MarcasInterface | null,
    modo: 'crear' | 'editar' | 'eliminar'
}
