import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterProdcutsComponent } from './filter-prodcuts.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('FilterProdcutsComponent', () => {
  let component: FilterProdcutsComponent;
  let fixture: ComponentFixture<FilterProdcutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterProdcutsComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterProdcutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getProducts', () => {
    const spy = spyOn((component as any).productStroe, 'filter').and.returnValue(
      of(true)
    );
    component.filter = '123'
    component.getProducts();
    expect(spy).toHaveBeenCalledWith('123');
  });
});
