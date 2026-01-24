import { applyDecorators } from '@nestjs/common';
import type { ValidationArguments } from 'class-validator';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
  Validate,
} from 'class-validator';

interface IValidatorConfig {
  isString?: boolean;
  isNotEmpty?: boolean;
  isEmail?: boolean;
  isOptional?: boolean;
  minLength?: number;
  length?: {
    min: number;
    max: number;
  };
  uuidVersion?: Parameters<typeof IsUUID>[0];
  customValidators?: Parameters<typeof Validate>[0][];
  matches?: {
    regexp: RegExp;
    message: ({ property }: ValidationArguments) => string;
  };
}

class ValidatorFactoryClass {
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

    if (config.isOptional) {
      decorators.push(IsOptional());
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

    if (config.length && config.length.min && config.length.max) {
      decorators.push(
        Length(config.length.min, config.length.max, {
          message: ({ property }: ValidationArguments) =>
            `Поле ${property} должно быть не менее ${config.length!.min} и не более ${config.length!.max} символов`,
        }),
      );
    }

    return applyDecorators(...decorators);
  }
}

export const ValidatorFactory = (config: IValidatorConfig) => ValidatorFactoryClass.create(config);
