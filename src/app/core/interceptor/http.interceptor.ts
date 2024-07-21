import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getToken();
  const isLoginUrl = req.url.includes('login');

  let cloneRequest = req;

  if (token && !isLoginUrl) {
    cloneRequest = req.clone({
      headers: req.headers.set('Authorization', token),
    });
  }

  return next(cloneRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        storage.clearStorage();
        router.navigateByUrl('/auth/login');
      }

      if (err.status === 403) {
        router.navigateByUrl('/home/dashboard');
      }

      return throwError(() => err);
    })
  );
};
