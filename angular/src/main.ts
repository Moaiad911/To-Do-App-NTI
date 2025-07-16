import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { App } from './app/app';
import { Landing } from './app/pages/landing/landing';
import { AuthComponent } from './app/pages/auth/auth.component';

bootstrapApplication(App, {
  providers: [
    provideRouter([
      { path: '', component: Landing },      // Landing shows first
      { path: 'auth', component: AuthComponent }
    ])
  ]
});
