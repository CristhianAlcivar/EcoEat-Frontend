import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/images', 
    pathMatch: 'full' 
  },
  {
    path: 'images',
    loadComponent: () => import('./modules/images/images.component').then(m => m.ImagesComponent)
  },
  {
    path: 'materials',
    loadComponent: () => import('./modules/materials/materials.component').then(m => m.MaterialsComponent)
  },
  {
    path: 'model-performance',
    loadComponent: () => import('./modules/model-performance/model-performance.component').then(m => m.ModelPerformanceComponent)
  }
];