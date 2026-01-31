import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import localeEsMx from '@angular/common/locales/es-MX';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authloginInterceptor } from './common/authlogin.interceptor';
import { errorApiInterceptor } from './common/error-api.interceptor';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { registerLocaleData } from '@angular/common';

 registerLocaleData(localeEsMx);
export const appConfig: ApplicationConfig = {
 
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    { provide: MAT_DATE_LOCALE, useValue: 'es-MX' },
    provideRouter(routes),
     provideAnimations(),
     provideHttpClient((withInterceptors([authloginInterceptor, errorApiInterceptor])))
  ],

};
