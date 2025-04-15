import {inject} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {Observable, retry, throwError} from 'rxjs';
import {catchError, delay, filter, finalize, scan, switchMap, take} from 'rxjs/operators';
import {AuthService} from '../services/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  let modifiedReq = req;

  // Set the Authorization header if the token exists
  if (token) {
    modifiedReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
  }

  return next(modifiedReq).pipe(
    retry({
        delay: (errors: Observable<HttpErrorResponse>) =>
          errors.pipe(
            scan((retryCount, error) => {
              if (retryCount >= 2 || error.status === 401) {
                throw error;
              }
              return retryCount + 1;
            }, 0),
            delay(1000)
          )
      }
    ),
    catchError((error: HttpErrorResponse) => {
      if (error && error.status === 401) {
        // Token might be expired, let's refresh it.
        if (authService.refreshTokenInProgress) {
          // If the token refresh is in progress, wait until we get a new token
          return authService.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap(() => next(modifiedReq))
          );
        } else {
          authService.refreshTokenInProgress = true;

          // Set the refreshTokenSubject to null so that subsequent requests wait for the new token
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
