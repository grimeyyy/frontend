import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('token'); // Beispiel

  if (!isAuthenticated) {
    router.navigate(['/home']);
  }

  return isAuthenticated;
};
