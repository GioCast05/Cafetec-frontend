import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalUsuarioConfigInterface } from './modal-usuario-config.interface';
import { UsuariosInterface } from '../../interfaces/usuarios.interface';

@Component({
  selector: 'app-usuariosform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuariosform.component.html',
  styleUrl: './usuariosform.component.css'
})
export class UsuariosformComponent {
  @Input() config!: ModalUsuarioConfigInterface;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<UsuariosInterface>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      idUsuario: [null],
      nombre: ['', [Validators.required]],
      apellidoP: ['', [Validators.required]],
      apellidoM: ['', [Validators.required]],
      username: ['', [Validators.required]],
      password: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.config) return;
    if (this.config.modo === 'editar' && this.config.usuario) {
      this.form.reset();
      this.form.patchValue(this.config.usuario);
      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();
    }
    if (this.config.modo === 'crear') {
      this.form.reset();
      this.form.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
      this.form.get('password')?.updateValueAndValidity();
    }
  }

  cancelar(): void {
    this.form.reset();
    this.close.emit();
  }

  guardar(): void {
    if (this.config.modo !== 'eliminar' && this.form.invalid) return;
    const data: UsuariosInterface = this.config.modo === 'eliminar'
      ? this.config.usuario!
      : { ...this.form.value };
    this.save.emit(data);
    this.form.reset();
    this.close.emit();
  }
}