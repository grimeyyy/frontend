import {inject} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, retry, throwError, timer} from 'rxjs';
import {catchError, filter, finalize, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  const isAuthRequest = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');
  if (isAuthRequest) {
    return next(req); // Skip token logic for login/refresh
  }

  let modifiedReq = req;

  // Set the Authorization header if the token exists
  if (token) {
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(modifiedReq).pipe(
    retry({
      count: 2,
      delay: (error: HttpErrorResponse, _retryCount: number) => {
        if (error.status === 0) {
          return timer(1000);
        }
        return throwError(() => error);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      if (error && error.status === 401) {
        if (authService.refreshTokenInProgress) {
          return authService.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap(() => next(modifiedReq))
          );
        } else {
          authService.refreshTokenInProgress = true;
          authService.refreshTokenSubject.next(null);

          return authService.refreshAccessToken().pipe(
            switchMap((success: boolean) => {
              authService.refreshTokenSubject.next(success);
              return next(modifiedReq);
            }),
            finalize(() => (authService.refreshTokenInProgress = false))
          );
        }
      } else {
        return throwError(() => error);
      }
    })
  );
}
