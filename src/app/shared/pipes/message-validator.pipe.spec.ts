import { MessageValidatorPipe } from './message-validator.pipe';

describe('MessageValidatorPipe', () => {
  let pipe: MessageValidatorPipe;

  beforeEach(() => {
    pipe = new MessageValidatorPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform "required" validation error', () => {
    const errorMessage = pipe.transform({ required: true });
    expect(errorMessage).toBe('Este campo es requerido');
  });

  it('should transform "minlength" validation error', () => {
    const errorMessage = pipe.transform({ minlength: { requiredLength: 5 } });
    expect(errorMessage).toBe('Minimo 5 caracteres');
  });

  it('should transform "maxlength" validation error', () => {
    const errorMessage = pipe.transform({ maxlength: { requiredLength: 10 } });
    expect(errorMessage).toBe('Máximo 10 caracteres');
  });

  it('should transform "pattern" validation error', () => {
    const errorMessage = pipe.transform({ pattern: true });
    expect(errorMessage).toBe('Url no validad');
  });

  it('should transform custom "idAlreadyExists" validation error', () => {
    const errorMessage = pipe.transform({ idAlreadyExists: true });
    expect(errorMessage).toBe('Esta ID ya fue usada');
  });

  it('should return empty string if no matching validation key', () => {
    const errorMessage = pipe.transform({ unknownError: true });
    expect(errorMessage).toBe('');
  });
});
