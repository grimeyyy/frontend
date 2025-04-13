import {Injectable, NgZone} from '@angular/core';
import {fromEvent, merge, Subscription} from 'rxjs';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {WindowRefService} from './window-ref.service';
import {environment} from '../../environments/environment';

@Injectable({providedIn: 'root'})
export class IdleService {
  private timer?: ReturnType<typeof setTimeout>;
  private timeoutInMs = environment.timeoutInMs;
  private userEvents$?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone,
    private windowRef: WindowRefService
  ) {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.startWatching();
      } else {
        this.stopWatching();
      }
    });
  }

  startWatching(): void {
    const win = this.windowRef.nativeWindow;
    if (!win) return;

    this.ngZone.runOutsideAngular(() => {
      const activityEvents = merge(
        fromEvent(win, 'mousemove'),
        fromEvent(win, 'click'),
        fromEvent(win, 'keydown'),
        fromEvent(win, 'touchstart'),
      );

      this.userEvents$ = activityEvents.subscribe(() => this.resetTimer());
      this.resetTimer();
    });
  }

  stopWatching(): void {
    this.userEvents$?.unsubscribe();
    clearTimeout(this.timer);
  }

  private resetTimer(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.ngZone.run(() => {
        this.authService.logout();
        void this.router.navigate(['/login'], {
          queryParams: {reason: 'session-expired'}
        });
      });
    }, this.timeoutInMs);
  }
}
