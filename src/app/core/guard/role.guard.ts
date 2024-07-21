import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from '../../services/storage/storage.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean> => {
  const router = inject(Router);
  const storage = inject(StorageService);

  const token = storage.getToken();

  if (!token || token != null) {
    if (state.url.includes('login')) {
      router.navigateByUrl('/home/dashboard');
      return of(false);
    }
  }

  return of(true);
};
