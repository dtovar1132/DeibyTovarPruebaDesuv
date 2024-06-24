import { Component,  inject } from '@angular/core';
import { ProdcutsTableComponent } from './prodcuts-table/prodcuts-table.component';
import { FilterProdcutsComponent } from './filter-prodcuts/filter-prodcuts.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProdcutsTableComponent, FilterProdcutsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  
  private readonly router: Router = inject(Router);

  goToAdd(): void {
    this.router.navigate(['products/add']);
  }


}
