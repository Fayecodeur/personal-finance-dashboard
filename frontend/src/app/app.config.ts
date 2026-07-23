import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { PaginatorFr } from './core/services/paginator-fr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(withInterceptors([authInterceptor])),

    provideAnimationsAsync(),

    provideNativeDateAdapter(),

    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR',
    },

    {
      provide: MatPaginatorIntl,
      useClass: PaginatorFr,
    },

    provideCharts(withDefaultRegisterables()),
  ],
};
