import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `
    <h1>App Works</h1>
    <a routerLink="/auth">Go to Auth</a>
    <router-outlet></router-outlet>
  `
})
export class App {}


