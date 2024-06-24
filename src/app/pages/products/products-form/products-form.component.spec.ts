import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFormComponent } from './products-form.component';
import { ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('ProductsFormComponent', () => {
  let component: ProductsFormComponent;
  let fixture: ComponentFixture<ProductsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsFormComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }, provideHttpClient()],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.id = '123';
    const spy = spyOn((component as any).productStroe, 'show').and.returnValue(
      of(true)
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith('123');
  });

  it('should set date_revision one year ahead when date_release changes', () => {
    component.form.get('date_release')?.setValue('2022-06-24');
    fixture.detectChanges();
    expect(component.form.get('date_revision')?.value).toBe('2023-06-24');
  });

  it('should reset the form', () => {
    component.form.get('date_release')?.setValue('2022-01-01');
    component.form.get('date_revision')?.setValue('2022-01-01');
    component.resetForm();
    expect(component.form.get('date_release')?.value).toBe(null);
    expect(component.form.get('date_revision')?.value).toBe(null);
  });

  it('should submit form add', () => {
    component.form.patchValue({
      id: '123',
      name: 'qweqweasdasd',
      description: 'qweqweqweqwe',
      logo: 'https://miro.medium.com/v2/resize:fit:786/format:webp/c8q-1H2UBaSO9Z-Lmq4Bg.png',
      date_release: '2024-06-23',
      date_revision: '2025-06-23',
    });
    const spy = spyOn((component as any).productStroe, 'save').and.returnValue(
      of(true)
    );
    component.submit();
    expect(spy).toHaveBeenCalledWith(component.form.getRawValue());
  });

  it('should submit form edit', () => {
    component.form.patchValue({
      id: '123',
      name: 'qweqweasdasd',
      description: 'qweqweqweqwe',
      logo: 'https://miro.medium.com/v2/resize:fit:786/format:webp/c8q-1H2UBaSO9Z-Lmq4Bg.png',
      date_release: '2024-06-23',
      date_revision: '2025-06-23',
    });
    component.id = '123'
    const spy = spyOn((component as any).productStroe, 'updated').and.returnValue(
      of(true)
    );
    component.submit();
    expect(spy).toHaveBeenCalledWith(component.form.getRawValue());
  });
  
});
