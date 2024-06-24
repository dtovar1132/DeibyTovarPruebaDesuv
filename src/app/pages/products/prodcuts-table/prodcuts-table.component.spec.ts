import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdcutsTableComponent } from './prodcuts-table.component';

import { ProductStore } from '@store/product.store';
import { provideHttpClient } from '@angular/common/http';

describe('ProdcutsTableComponent', () => {
  let component: ProdcutsTableComponent;
  let fixture: ComponentFixture<ProdcutsTableComponent>;

  let productStroe: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdcutsTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    productStroe = TestBed.inject(ProductStore);
    fixture = TestBed.createComponent(ProdcutsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
