import {Component, OnInit, Renderer2} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {IdleService} from './shared/services/idle.service';
import {WindowRefService} from './shared/services/window-ref.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  window: Window | null;

  constructor(private idleService: IdleService, private renderer: Renderer2, private windowRef: WindowRefService) {
    this.window = windowRef.nativeWindow;
  }

  ngOnInit(): void {
    if (this.window) {
      const script = this.renderer.createElement('script');
      script.src = 'assets/theme/js/theme.bundle.js';
      script.type = 'text/javascript';
      script.defer = true;
      this.renderer.appendChild(document.body, script);
    }
  }
}
