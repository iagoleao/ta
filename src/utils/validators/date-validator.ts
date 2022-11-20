import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DateTime } from 'luxon';

@ValidatorConstraint({ name: 'DateValidator' })
@Injectable()
export class DateValidator implements ValidatorConstraintInterface {
  validate(value: string | Date) {
    const dateObj =
      value instanceof Date
        ? DateTime.fromJSDate(value)
        : DateTime.fromISO(value);

    return dateObj.isValid;
  }

  defaultMessage() {
    return `Invalid Date`;
  }
}
