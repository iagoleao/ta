import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateValidator } from '../validators';

export function IsDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: DateValidator,
    });
  };
}
