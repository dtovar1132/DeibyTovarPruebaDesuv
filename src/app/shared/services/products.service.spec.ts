import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { Product } from '@models/Product.model';
import { of } from 'rxjs';

const defaultProduct: Product = {
  id: '1',
  name: '2',
  description: '3',
  logo: '4',
  date_release: '2024-06-23',
  date_revision: '2025-06-23',
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAll', () => {
    TestBed.inject(HttpClient).get = jasmine
      .createSpy()
      .and.returnValue(of({data:[defaultProduct]}));

    service.getAll().subscribe((response) => {
      expect(response).toEqual({data:[defaultProduct]});
    });
  });

  it('save', () => {
    TestBed.inject(HttpClient).post = jasmine
      .createSpy()
      .and.returnValue(of({data:defaultProduct}));
    service.save(defaultProduct).subscribe((response) => {
      expect(response).toEqual({data:defaultProduct});
    });
  });

  it('show', () => {
    TestBed.inject(HttpClient).get = jasmine
      .createSpy()
      .and.returnValue(of(defaultProduct));

    service.show("123").subscribe((response:any) => {
      expect(response).toEqual(defaultProduct);
    });
  });

  it('updated', () => {
    TestBed.inject(HttpClient).put = jasmine
      .createSpy()
      .and.returnValue(of({data:defaultProduct}));

    service.updated(defaultProduct).subscribe((response:any) => {
      expect(response).toEqual({data:defaultProduct});
    });
  });

  it('delete', () => {
    TestBed.inject(HttpClient).delete = jasmine
      .createSpy()
      .and.returnValue(of({data:defaultProduct}));

    service.delete(defaultProduct).subscribe((response:any) => {
      expect(response).toEqual({data:defaultProduct});
    });
  });
});
