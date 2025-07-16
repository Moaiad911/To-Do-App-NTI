import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./pages/tasks/tasks.component').then((m) => m.TasksComponent),
  },
];
