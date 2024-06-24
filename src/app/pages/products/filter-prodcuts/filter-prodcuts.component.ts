import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductStore } from '@store/product.store';

@Component({
  selector: 'app-filter-prodcuts',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-prodcuts.component.html',
  styleUrl: './filter-prodcuts.component.scss'
})
export class FilterProdcutsComponent {
  readonly productStroe = inject(ProductStore);
  
  filter:string = ''


  getProducts(){
    this.productStroe.filter(this.filter);
  }
  
}
