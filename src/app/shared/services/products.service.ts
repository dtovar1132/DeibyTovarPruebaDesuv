import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Product, ProductResponse } from '@models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private urlBase:string = `${environment.apiUrl}products`

  private readonly http:HttpClient = inject(HttpClient);


  getAll():Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.urlBase)
  }

  save(product:Product):Observable<ProductResponse>{
    return this.http.post<ProductResponse>(this.urlBase, product)
  }

  show(id:string):any{
    return this.http.get(`${this.urlBase}/${id}`)
  }

  updated(product:Product):Observable<ProductResponse>{
    return this.http.put<ProductResponse>(`${this.urlBase}/${product.id}`, product)
  }

  delete(product:Product):Observable<ProductResponse>{
    return this.http.delete<ProductResponse>(`${this.urlBase}/${product.id}`)
  }

  validateId(id:string){
    return this.http.get(`${this.urlBase}/verification/${id}`)
  }
}
