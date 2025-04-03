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
    return this.http.post('api/auth/sign-up', signUpData);
  }

  login(loginData: AuthRequest): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('api/auth/login', loginData);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }

  resendConfirmationEmail(email: string) {
     return this.http.post('/api/auth/resend-confirmation?email=' + email,  { });
  }

  forgotPassword(email: string) {
    return this.http.post('/api/auth/forgot-password', { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post('/api/auth/reset-password', { token, newPassword });
  }
}
