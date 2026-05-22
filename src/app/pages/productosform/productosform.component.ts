import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalProductoConfigInterface } from './modal-producto-config.interface';
import { ProductosInterface } from '../../interfaces/productos.interface';
import { MarcasService } from '../../services/marcas.service';
import { CategoriasService } from '../../services/categorias.service';
import { MarcasInterface } from '../../interfaces/marcas.interface';
import { CategoriasInterface } from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-productosform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productosform.component.html',
  styleUrl: './productosform.component.css'
})
export class ProductosformComponent {
  @Input() config!: ModalProductoConfigInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ProductosInterface>();

  private marcasService = inject(MarcasService);
  private categoriasService = inject(CategoriasService);

  public form: FormGroup;
  public marcas: MarcasInterface[] = [];
  public categorias: CategoriasInterface[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idProducto: [null],
      descripcion: ['', [Validators.required]],
      precioUnitario: [0, [Validators.required, Validators.min(0.1)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      codigo: ['', [Validators.required]],
      idMarca: [null, [Validators.required]],
      idCategoria: [null, [Validators.required]],
      image: [''] // 🚀 Control añadido para recibir la cadena de texto de la imagen
    });
  }

  ngOnInit(): void {
    // Carga de marcas del servidor
    this.marcasService.obtenerMarcas(1, 100).subscribe({
      next: (res) => { if (res.status) this.marcas = res.data.marcas; }
    });
    
    // Carga de categorías del servidor
    this.categoriasService.obtenerCategorias(1, 100).subscribe({
      next: (res) => { if (res.status) this.categorias = res.data.categorias; }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.config) return;
    
    if (this.config.modo === 'editar' && this.config.producto) {
      this.form.reset();
      this.form.patchValue(this.config.producto);
    }
    
    if (this.config.modo === 'crear' || this.config.modo === 'eliminar') {
      this.form.reset();
    }
  }

  cancelar(): void {
    this.form.reset();
    this.close.emit();
  }

  guardar(): void {
    if (this.config.modo !== 'eliminar' && this.form.invalid) return;
    
    let data: ProductosInterface;

    if (this.config.modo === 'eliminar') {
      data = this.config.producto!;
    } else {
      data = {
        ...this.form.value,
        precioUnitario: Number(this.form.value.precioUnitario),
        stock: Number(this.form.value.stock),
        idMarca: Number(this.form.value.idMarca),
        idCategoria: Number(this.form.value.idCategoria),
        activo: 1,
        // Mandamos la URL de la imagen o una cadena vacía/null si el usuario no ingresó nada
        image: this.form.value.image ? this.form.value.image : null
      };
    }

    this.save.emit(data);
    this.form.reset();
    this.close.emit();
  }
}