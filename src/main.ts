/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {TranslateService} from '@ngx-translate/core';
import {ThemeService} from './app/shared/services/theme.service';

bootstrapApplication(AppComponent, appConfig)
  .then(appRef => {
    // translations service
    const translate = appRef.injector.get(TranslateService);
    translate.setDefaultLang('en');
    translate.use('en');

    // theme service
    const injector = appRef.injector;
    const themeService = injector.get(ThemeService);
    themeService.initializeTheme();
  })
  .catch((err) => console.error(err));
