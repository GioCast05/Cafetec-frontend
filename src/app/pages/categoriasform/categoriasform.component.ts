import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalCategoriaConfigInterface } from './modal-categoria-config.interface';
import { CategoriasInterface } from '../../interfaces/categorias.interface';

@Component({
  selector: 'app-categoriasform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categoriasform.component.html',
  styleUrl: './categoriasform.component.css'
})
export class CategoriasformComponent {
  @Input() config!: ModalCategoriaConfigInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<CategoriasInterface>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idCategoria: [null],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.config) return;
    if (this.config.modo === 'editar' && this.config.categoria) {
      this.form.reset();
      this.form.patchValue({
        idCategoria: this.config.categoria.idCategoria,
        descripcion: this.config.categoria.descripcion,
      });
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
    const data: CategoriasInterface = this.config.modo === 'eliminar'
      ? this.config.categoria!
      : { ...this.form.value };
    this.save.emit(data);
    this.form.reset();
    this.close.emit();
  }
}