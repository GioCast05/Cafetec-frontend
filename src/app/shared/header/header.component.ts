// header.component.ts

import {
  Component,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  menuOpen = signal(false);
  usuario = signal<any>({});
  constructor() {
    // Verificar que estamos en navegador
    if (isPlatformBrowser(this.platformId)) {
      const usuarioGuardado =
        localStorage.getItem('usuario');
      if (usuarioGuardado) {
        this.usuario.set(
          JSON.parse(usuarioGuardado)
        );
      }
    }
  }
  iniciales = computed(() => {
    const u = this.usuario();
    const nombre =
      u?.nombre?.[0] ?? '';
    const apellido =
      u?.apellidoP?.[0] ?? '';
    return (nombre + apellido)
      .toUpperCase() || 'US';
  });

  nombreCompleto = computed(() => {
    const u = this.usuario();
    return `${u?.nombre ?? 'Usuario'} ${u?.apellidoP ?? ''}`;
  });

  rol = computed(() => {
    return this.usuario()?.rol ?? 'Administrador';
  });

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('usuario');
    }
    this.closeMenu();
    this.router.navigate(['/auth/login']);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 640) {
      this.closeMenu();
    }
  }
}