import {Directive, HostBinding, Input, NgZone, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {fromEvent, Subscription} from 'rxjs';
import {WindowRefService} from '../services/window-ref.service';

@Directive({
  selector: '[appActiveHashLink]',
  standalone: true,
})
export class ActiveHashLinkDirective implements OnInit, OnDestroy {
  @Input('appActiveHashLink') targetFragment!: string;
  @HostBinding('class.active') isActive = false;

  private subscriptions = new Subscription();
  private readonly window: Window | null;

  constructor(
    private router: Router,
    private zone: NgZone,
    private windowRef: WindowRefService,
  ) {
    this.window = this.windowRef.nativeWindow;
  }

  ngOnInit(): void {
    this.updateActiveState();

    this.subscriptions.add(
      this.router.events.subscribe(() => {
        this.zone.run(() => this.updateActiveState());
      })
    );
    if (this.window) {
      this.subscriptions.add(
        fromEvent(this.window, 'hashchange').subscribe(() => {
          this.zone.run(() => this.updateActiveState());
        })
      );
    }

  }

  private updateActiveState(): void {
    const currentHash = this.window?.location.hash.replace('#', '');
    this.isActive = currentHash === this.targetFragment;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}

