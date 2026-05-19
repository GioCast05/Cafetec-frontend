import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { registerUsuarioRequest } from '../../interfaces/auth-request.interface';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);
  private formBuild   = inject(FormBuilder);

  public formRegister: FormGroup = this.formBuild.group({
    nombre:    ['', Validators.required],
    apellidoP: ['', Validators.required],
    apellidoM: ['', Validators.required],
    username:  ['', Validators.required],
    password:  ['', Validators.required],
  });

  registrar() {
    if (!this.formRegister.valid) return;

    const objeto : registerUsuarioRequest = {
      nombre:    this.formRegister.value.nombre,
      apellidoP: this.formRegister.value.apellidoP,
      apellidoM: this.formRegister.value.apellidoM,
      username:  this.formRegister.value.username,
      password:  this.formRegister.value.password,
    };

    this.authService.register(objeto).subscribe({
      next: (data) => {
        console.log(data);
        if (data.status) {
          alert('Usuario registrado correctamente');
          this.router.navigate(['/auth/login']);
        } else {
          alert(data.message);
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error al registrar usuario');
      },
    });
  }
}