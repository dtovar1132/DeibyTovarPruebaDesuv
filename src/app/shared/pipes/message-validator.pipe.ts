import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'messageValidator',
  standalone: true,
})
export class MessageValidatorPipe implements PipeTransform {
  messages = {
    required: 'Este campo es requerido',
  };

  transform(value: any) {
    const key = Object.keys(value)[0];
    let message = '';
    switch (key) {
      case 'required':
        message = 'Este campo es requerido';
        break;
      case 'minlength':
        message = `Minimo ${value['minlength'].requiredLength} caracteres`;
        break;
      case 'maxlength':
        message = `Máximo ${value['maxlength'].requiredLength} caracteres`;
        break;
      case 'pattern':
        message = `Url no validad`;
        break;
      case 'idAlreadyExists':
          message = `Esta ID ya fue usada`;
          break;
    }
    return message;
  }
}
