import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hangman'
  },
  {
    path: 'hangman',
    loadChildren: () => import('./feature/hangman/routes')
  },
  {
    path: '**',
    redirectTo: 'hangman'
  }
];
