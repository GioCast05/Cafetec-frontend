import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginUsuarioRequest } from '../../interfaces/auth-request.interface';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService)
  private router = inject(Router)

  public formBuild = inject(FormBuilder)

  public formLogin: FormGroup = this.formBuild.group({
    username: ['',Validators.required],
    password: ['',Validators.required]
  })

  iniciarSesion(){
    if (!this.formLogin.valid) return;
    
    const objeto: LoginUsuarioRequest = {
      username: this.formLogin.value.username,
      password: this.formLogin.value.password
    }

    this.authService.login(objeto).subscribe({
      next: (data) => {
        console.log(data);
        if(data.status){
          localStorage.setItem('token', data.data?.token || '')
          this.router.navigate(['/']);
        } else {
          alert(data.message)
        }
      },

      error: (err) => {
        console.error(err);
        alert('Error al iniciar sesión')
      },
    });

  }
  
}
