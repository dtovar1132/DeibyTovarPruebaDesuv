import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductStore } from '@store/product.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  readonly productStroe = inject(ProductStore);
  
  paginator: number[] = [5, 10, 20];

  perPage: number = 5;

  public page:number = 1;

  setPerpage(){
    this.productStroe.setPerPaget(this.perPage);
  }

  getPage(){
    if(this.page){
      if(this.page<1 ){
        this.page = 1;
      }
      if(this.page > this.productStroe.totalPages()){
        this.page = this.productStroe.totalPages();
      }
      this.productStroe.paginate(this.page);
    }
    
  }
}
