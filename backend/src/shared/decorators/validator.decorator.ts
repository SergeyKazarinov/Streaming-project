import { applyDecorators } from '@nestjs/common';
import type { ValidationArguments } from 'class-validator';
import { IsEmail, IsNotEmpty, IsString, IsUUID, Matches, MinLength, Validate } from 'class-validator';

interface IValidatorConfig {
  isString?: boolean;
  isNotEmpty?: boolean;
  isEmail?: boolean;
  minLength?: number;
  uuidVersion?: Parameters<typeof IsUUID>[0];
  customValidators?: Parameters<typeof Validate>[0][];
  matches?: {
    regexp: RegExp;
    message: ({ property }: ValidationArguments) => string;
  };
}

class ValidatorFactory {
  static create(config: IValidatorConfig) {
    const decorators: PropertyDecorator[] = [];

    if (config.isString) {
      decorators.push(
        IsString({ message: ({ property }: ValidationArguments) => `Поле ${property} должно быть строкой` }),
      );
    }

    if (config.isNotEmpty) {
      decorators.push(
        IsNotEmpty({ message: ({ property }: ValidationArguments) => `Поле ${property} не должно быть пустым` }),
      );
    }

    if (config.isEmail) {
      decorators.push(
        IsEmail({}, { message: ({ property }: ValidationArguments) => `Поле ${property} должно быть email` }),
      );
    }

    if (config.minLength) {
      decorators.push(
        MinLength(config.minLength, {
          message: ({ property }: ValidationArguments) =>
            `Поле ${property} должно быть не менее ${config.minLength} символов`,
        }),
      );
    }

    if (config.customValidators && config.customValidators.length > 0) {
      decorators.push(...config.customValidators.map((validator) => Validate(validator)));
    }

    if (config.uuidVersion) {
      decorators.push(
        IsUUID(config.uuidVersion, {
          message: ({ property }: ValidationArguments) => `Поле ${property} должно быть UUID`,
        }),
      );
    }

    if (config.matches) {
      decorators.push(
        Matches(config.matches.regexp, {
          message: config.matches.message,
        }),
      );
    }

    return applyDecorators(...decorators);
  }
}

export const Validator = (config: IValidatorConfig) => ValidatorFactory.create(config);
