import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, tap} from 'rxjs';
import {Router} from '@angular/router';
import {catchError, switchMap} from 'rxjs/operators';

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean>;
  public loggedIn$: Observable<boolean>;
  public refreshTokenInProgress = false;
  public refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
    this.loggedIn$ = this.loggedInSubject.asObservable();
  }

  getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  refreshAccessToken(): Observable<boolean> {
    return this.http.post<any>('/api/auth/refresh', {}, { withCredentials: true }).pipe(
      switchMap((response) => {
        const newToken = response.token;
        localStorage.setItem('token', newToken);
        return of(true);
      }),
      catchError(() => of(false))
    );
  }

  login(loginData: AuthRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', loginData).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}, { withCredentials: true }).subscribe({
      complete: () => {
        localStorage.removeItem('token');
        this.loggedInSubject.next(false);
        void this.router.navigate(['/home']);
      }
    });
  }

  private hasToken(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return this.loggedInSubject.value;
  }

  signUp(signUpData: AuthRequest): Observable<any> {
    return this.http.post<{ message: string }>('api/auth/sign-up', signUpData);
  }

  verifyEmail(token: string): Observable<any> {
    return this.http.get<{ message: string }>(`/api/auth/verify-email?token=${token}`);
  }

  resendVerificationEmail(email: string) {
    return this.http.post<{ message: string }>('/api/auth/resend-verification', {email});
  }

  forgotPassword(email: string) {
    return this.http.post<{ message: string }>('/api/auth/forgot-password', {email});
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<{ message: string }>('/api/auth/reset-password', {token, newPassword});
  }
}
