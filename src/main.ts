/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {ThemeService} from './app/services/theme.service';

const themeService = new ThemeService();
themeService.initializeTheme();

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    const translate = appRef.injector.get(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');
  })
  .catch((err) => console.error(err));
