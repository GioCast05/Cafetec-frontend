import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUsuarioRequest, registerUsuarioRequest } from '../../interfaces/auth-request.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router      = inject(Router);
  private formBuild   = inject(FormBuilder);

  vista = signal<'login' | 'register'>('login');

  // ── Formulario Login ──
  formLogin: FormGroup = this.formBuild.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // ── Formulario Register ──
  formRegister: FormGroup = this.formBuild.group({
    nombre:    ['', Validators.required],
    apellidoP: ['', Validators.required],
    apellidoM: ['', Validators.required],
    username:  ['', Validators.required],
    password:  ['', Validators.required],
  });

  iniciarSesion() {
    if (!this.formLogin.valid) return;

    const objeto: LoginUsuarioRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password,
    };

    this.authService.login(objeto).subscribe({
      next: (data) => {
        if (data.status) {
          localStorage.setItem('token', data.data?.token || '');
          this.router.navigate(['/']);
        } else {
          alert(data.message);
        }
      },
      error: () => alert('Error al iniciar sesión'),
    });
  }

  registrar() {
    if (!this.formRegister.valid) return;

    const objeto: registerUsuarioRequest = {
      nombre:    this.formRegister.value.nombre,
      apellidoP: this.formRegister.value.apellidoP,
      apellidoM: this.formRegister.value.apellidoM,
      username:  this.formRegister.value.username,
      password:  this.formRegister.value.password,
    };

    this.authService.register(objeto).subscribe({
      next: (data) => {
        if (data.status) {
          alert('Usuario registrado correctamente');
          this.vista.set('login');
        } else {
          alert(data.message);
        }
      },
      error: () => alert('Error al registrar usuario'),
    });
  }
}