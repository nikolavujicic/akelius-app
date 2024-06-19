import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@pages/menu/menu.page').then(c => c.MenuPage)
  },
  {
    path: 'languages',
    loadComponent: () => import('@pages/languages/languages.component').then(c => c.LanguagesComponent)
  },
  {
    path: 'levels',
    loadComponent: () => import('@pages/levels/levels.component').then(c => c.LevelsComponent)
  },
  {
    path: 'steps/:levelId',
    loadComponent: () => import('@pages/steps/steps.component').then(c => c.StepsComponent)
  },
  {
    path: 'slideshow/:slideshowId',
    loadComponent: () => import('@pages/slideshow/slideshow.component').then(c => c.SlideshowComponent)
  },
  {
    path: 'progress',
    loadComponent: () => import('@pages/progress/progress.component').then(c => c.ProgressComponent)
  }
];
