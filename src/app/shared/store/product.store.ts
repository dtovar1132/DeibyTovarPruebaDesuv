import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Product, ProductStoreModel } from '@models/Product.model';
import { lastValueFrom } from 'rxjs';
import { ProductsService } from '@services/products.service';

const initialState: ProductStoreModel = {
  products: [],
  productsFilter: [],
  productsPage: [],
  perPage: 5,
  filter: '',
  page: 1,
  totalPages: 0,
  product: null
};

export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      { products, filter, perPage, productsFilter, ...store },
      productService = inject(ProductsService)
    ) => ({
      async getAll() {
        const response = await lastValueFrom(productService.getAll());
        patchState(store, { products: response.data as Product[] });
        patchState(store, { productsFilter: response.data as Product[] });
        this.paginate();
      },
      async save(product: Product) {
        const response = await lastValueFrom(productService.save(product));
        const newProducts = [...products(), response.data!];
        patchState(store, { products: newProducts as Product[] });
      },
      async show(id:string){
        const response = await lastValueFrom(productService.show(id));
        patchState(store,{product: response as Product})
      },
      async updated(product: Product){
        const response = await lastValueFrom(productService.updated(product));
      },
      async delete(product: Product){
        const response = await lastValueFrom(productService.delete(product));
        let baseProducts = [...products()];
        baseProducts = baseProducts.filter(pr => pr.id != product.id);
        patchState(store, { products: baseProducts as Product[] });
        this.paginate();
      },
      baseFilter(filter: string){
        let globalProdcuts = [...products()];
        if (filter != '') {
          globalProdcuts = globalProdcuts.filter((pr) => {
           return  pr.name.toLowerCase().includes(filter.toLowerCase()) ||
              pr.description.toLowerCase().includes(filter.toLowerCase()) ||
              pr.date_release.toLowerCase().includes(filter.toLowerCase()) ||
              pr.date_revision.toLowerCase().includes(filter.toLowerCase());
          });
        }
        const totalPages = Math.ceil(productsFilter().length / perPage());
        patchState(store,{productsFilter:globalProdcuts});
        patchState(store,{totalPages});
      },
      filter(filter: string) {
       this.baseFilter(filter)
        patchState(store, {filter})
        patchState(store, {page:1})
        this.paginate()
      },
      paginate(page: number = 1){
        this.baseFilter(filter());
        let globalProdcuts = [...productsFilter()];
        const startIndex = (page - 1) * perPage();
        const endIndex = startIndex + perPage();
        globalProdcuts = globalProdcuts.slice(startIndex, endIndex);
        patchState(store,{page});
        patchState(store,{productsPage:globalProdcuts});
      },
      setPerPaget(perPage: number = 5){
        patchState(store,{perPage});
        this.paginate();
      }
    })
  )
);
