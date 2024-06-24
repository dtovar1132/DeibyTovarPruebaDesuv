import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'products',
    children: [
      {
        path: 'add',
        loadComponent: () =>
          import(
            './pages/products/products-form/products-form.component'
          ).then((c) => c.ProductsFormComponent),
      },
      {
        path: 'edit/:id',
        loadComponent: () =>
          import(
            './pages/products/products-form/products-form.component'
          ).then((c) => c.ProductsFormComponent),
      },
    ],
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
