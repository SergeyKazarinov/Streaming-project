import { type ValidationArguments, ValidatorConstraint, type ValidatorConstraintInterface } from 'class-validator';

import type { UpdatePasswordInput } from '@/modules/auth/reset-password/inputs/update-password.input';

/**
 * Декоратор для проверки пароля
 *
 * @export
 * @class IsPasswordMatchingConstraint
 * @typedef {IsPasswordMatchingConstraint} класс для проверки введенного подтвержденного пароля
 * @implements {ValidatorConstraintInterface}
 */
@ValidatorConstraint({ name: 'IsPasswordMatchingConstraint', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  validate(confirmPassword: string, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
    const updatePasswordInput = validationArguments?.object as UpdatePasswordInput;

    return updatePasswordInput.newPassword === confirmPassword;
  }

  defaultMessage(): string {
    return 'Пароли не совпадают';
  }
}
