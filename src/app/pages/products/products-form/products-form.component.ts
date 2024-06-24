import { CommonModule } from '@angular/common';
import { Component, OnInit, effect, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductForm } from '@models/Product.model';
import { ProductsService } from '@services/products.service';
import { ProductStore } from '@store/product.store';
import { MessageValidatorComponent } from 'app/shared/components/messageValidator/message-validator/message-validator.component';
import { ValidateUniquedId } from 'app/shared/customValidator/validateUniqueId';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MessageValidatorComponent],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.scss',
})
export class ProductsFormComponent implements OnInit {
  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  readonly productStroe = inject(ProductStore);
  private readonly productService: ProductsService = inject(ProductsService);
  private readonly router: Router = inject(Router);

  id = this.activatedRoute?.snapshot?.params['id'];

  nowDate = new Date().toISOString().split('T')[0];

  form: FormGroup = this.formBuilder.group<ProductForm>({
    id: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ])
    ),
    name: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
      ])
    ),
    description: new FormControl(
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(200),
      ])
    ),
    logo: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      ),
    ]),
    date_release: new FormControl(null, Validators.required),
    date_revision: new FormControl(null, Validators.required),
  });

  constructor() {
    effect(() => {
      if (this.productStroe.product!() && this.id) {
        this.form.patchValue({ ...this.productStroe.product!() });
      }
    });
  }

  ngOnInit(): void {
    this.form.get('date_revision')?.disable();

    if (this.id) {
      this.productStroe.show(this.id);
      this.form.get('id')?.disable();
    } else {
      this.form
        .get('id')
        ?.addAsyncValidators(
          ValidateUniquedId.createValidator(this.productService)
        );
    }

    this.form.get('date_release')?.valueChanges.subscribe((value: string) => {
      const newDate = new Date(value);
      newDate.setFullYear(newDate.getFullYear() + 1);
      this.form
        .get('date_revision')
        ?.setValue(newDate.toISOString().split('T')[0]);
    });
  }

  resetForm() {
    this.form.reset();
  }

  async submit() {
    const data = this.form.getRawValue();
    if (!this.id) {
      await this.productStroe.save(data);
    } else {
      await this.productStroe.updated(data);
    }
    this.router.navigate(['/products']);
  }
}
