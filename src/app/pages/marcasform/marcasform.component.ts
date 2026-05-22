import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalMarcaConfigInterfaceTs } from './modal-marca-config.interface.ts';
import { MarcasInterface } from '../../interfaces/marcas.interface.js';

@Component({
  selector: 'app-marcasform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './marcasform.component.html',
  styleUrl: './marcasform.component.css',
})
export class MarcasformComponent {

  @Input() config!: ModalMarcaConfigInterfaceTs;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<MarcasInterface>();

  public form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      idMarca: [null],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(!this.config) return;

    if(this.config.modo === 'editar' && this.config.marca){
      this.form.reset(); 
      this.form.patchValue({
        idMarca: this.config.marca.idMarca,
        descripcion: this.config.marca.descripcion,
      });
    }

    if(this.config.modo === 'crear'){
      this.form.reset();
    }

    if(this.config.modo === 'eliminar' && this.config.marca){
      this.form.reset();
    }
  }

  cancelar(): void{
    this.form.reset();
    this.close.emit();  
  }

  guardar(): void{
    if(this.config.modo !== 'eliminar' && this.form.invalid) return;
    
    const data: MarcasInterface = this.config.modo === 'eliminar' 
      ? this.config.marca! 
      : { ...this.form.value };

    this.save.emit(data);
    this.form.reset();
    this.close.emit();
  }
}