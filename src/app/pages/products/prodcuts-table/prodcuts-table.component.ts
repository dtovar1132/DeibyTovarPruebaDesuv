import { Component, OnInit, inject } from '@angular/core';
import { ProductStore } from '@store/product.store';
import { PaginationComponent } from './pagination/pagination.component';
import { MenuActionsComponent } from './menu-actions/menu-actions.component';

@Component({
  selector: 'app-prodcuts-table',
  standalone: true,
  imports: [PaginationComponent, MenuActionsComponent],
  templateUrl: './prodcuts-table.component.html',
  styleUrl: './prodcuts-table.component.scss'
})
export class ProdcutsTableComponent implements OnInit {

  readonly productStroe = inject(ProductStore);

  ngOnInit(): void {
    this.productStroe.getAll();
  }

}
