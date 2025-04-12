import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {
  }

  signUp(signUpData: AuthRequest): Observable<any> {
    return this.http.post<{ message: string }>('api/auth/sign-up', signUpData);
  }

  login(loginData: AuthRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', loginData);
  }

  isAuthenticated(): boolean {
    return typeof localStorage !== 'undefined' && !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
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
