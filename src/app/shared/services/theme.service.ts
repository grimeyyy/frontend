import {Injectable} from '@angular/core';
import {WindowRefService} from './window-ref.service';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeStorageKey = 'theme';
  private readonly window: Window | null;

  private currentThemeSubject = new BehaviorSubject<string>(this.getPreferredTheme());
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor(private windowRef: WindowRefService) {
    this.window = this.windowRef.nativeWindow;

    if (this.window) {
      const initialTheme = this.getPreferredTheme();
      this.setTheme(initialTheme);
      this.currentThemeSubject.next(initialTheme);
    }
  }

  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): string | null {
    if (this.window) {
      return localStorage.getItem(this.themeStorageKey);
    }
    return null;
  }

  /**
   * Set theme in localStorage
   */
  private setStoredTheme(theme: string): void {
    if (this.window) {
      localStorage.setItem(this.themeStorageKey, theme);
    }
  }

  /**
   * Get the preferred theme from localStorage or system preference
   */
  getPreferredTheme(): string {
    const storedTheme = this.getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return this.window?.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * Set the theme in the document element
   */
  setTheme(theme: string): void {
    if (theme === 'auto') {
      document.documentElement.setAttribute(
        'data-bs-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  }

  /**
   * Show the active theme in the UI and adjust the theme button state
   */
  showActiveTheme(theme: string, focus: boolean = false): void {
    const themeSwitcher = document.querySelector('#bd-theme') as HTMLElement | null;

    if (!themeSwitcher) {
      return;
    }

    const themeSwitcherText = document.querySelector('#bd-theme-text') as HTMLElement | null;
    const activeThemeIcon = document.querySelector('.theme-icon-active use') as SVGUseElement | null;
    const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`) as HTMLElement | null;

    if (btnToActive && activeThemeIcon) {
      const svgOfActiveBtn = btnToActive.querySelector('svg use')?.getAttribute('href') || '';

      document.querySelectorAll('[data-bs-theme-value]').forEach((element) => {
        element.classList.remove('active');
        element.setAttribute('aria-pressed', 'false');
      });

      btnToActive.classList.add('active');
      btnToActive.setAttribute('aria-pressed', 'true');

      if (activeThemeIcon && svgOfActiveBtn) {
        activeThemeIcon.setAttribute('href', svgOfActiveBtn);
      }

      if (themeSwitcherText && themeSwitcher) {
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive?.dataset['bsThemeValue']})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
      }
    }

    if (focus && themeSwitcher) {
      themeSwitcher.focus();
    }
  }

  /**
   * Event listener for system theme changes and update theme accordingly
   */
  listenToSystemThemeChange(): void {
    this.window?.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      const storedTheme = this.getStoredTheme();
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        this.setTheme(this.getPreferredTheme());
      }
    });
  }

  /**
   * Initialize theme and listen to system theme changes
   */
  initializeTheme(): void {
    if (this.window) {
      this.showActiveTheme(this.getPreferredTheme());
      this.listenToSystemThemeChange();
    }
  }

  /**
   * Toggle theme between light, dark, and auto
   */
  toggleTheme(theme: string): void {
    if (this.window) {
      this.setStoredTheme(theme);
      this.setTheme(theme);
      this.showActiveTheme(theme, true)
      this.currentThemeSubject.next(theme);
    }
  }
}
