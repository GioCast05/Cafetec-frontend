import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if(req.url.indexOf('auth') >  0)
    return next(req);

  const token = localStorage.getItem('token');
  const clonReq = req.clone({
    setHeaders: {
       Authorization: `Bearer ${token}`  
    }
  });

  return next(clonReq)

};
