import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth-guard';
import { MarcasComponent } from './pages/marcas/marcas.component';

export const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children:[
      {
        path: 'marcas',
        component: MarcasComponent
      }
    ] ,
    canActivate: [authGuard]
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(r => r.ROUTES_AUTH)
  },
];

