import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth-guard';
import { MarcasComponent } from './pages/marcas/marcas.component';
import { CategoriasComponent } from './pages/categorias/categorias.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { PuntoVentaComponent } from './pages/punto-venta/punto-venta.component';

export const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'punto-venta',
        component: PuntoVentaComponent
      },
      {
        path: 'marcas',
        component: MarcasComponent
      },
      {
        path: 'categorias',
        component: CategoriasComponent
      },
      {
        path: 'productos',
        component: ProductosComponent
      },
      {
        path: 'usuarios',
        component: UsuariosComponent
      },
      // 🚀 Redirección por defecto: Cuando entren a http://localhost:4200/ se irá directo a punto-venta
      {
        path: '',
        redirectTo: 'punto-venta',
        pathMatch: 'full'
      }
    ]
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.ROUTES_AUTH)
  },
  
  // Manejo por si escriben cualquier otra ruta que no exista
  {
    path: '**',
    redirectTo: ''
  }
];