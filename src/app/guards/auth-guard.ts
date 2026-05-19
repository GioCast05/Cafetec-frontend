import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const token = localStorage.getItem('token') || '';
  const router = inject(Router);

  const authService = inject(AuthService);

  if(token != ''){

    return authService.verifyToken(token).pipe(
      map((response)=>{
        if(response.status){
          return true;
        } else{
          localStorage.removeItem('token');
          router.navigate(['/auth/login']);
          return false;
        }
      }),
      catchError((error) => {
        localStorage.removeItem('token');
        router.navigate(['/auth/login'])
        return of(false);
      })
    )
  } else{
    const url = router.createUrlTree(['/auth/login']);
    return url;
  }
};
