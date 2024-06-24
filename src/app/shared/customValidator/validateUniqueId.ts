import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms"
import { ProductsService } from "@services/products.service"
import { Observable, map } from "rxjs"




export class ValidateUniquedId {
    static createValidator(producService: ProductsService): AsyncValidatorFn {
      return (control: AbstractControl): Observable<ValidationErrors> => {
        return producService
          .validateId(control.value)
          .pipe(
            map((result) =>
              result ? { idAlreadyExists: true } : {}
            )
          );
      };
    }
  }