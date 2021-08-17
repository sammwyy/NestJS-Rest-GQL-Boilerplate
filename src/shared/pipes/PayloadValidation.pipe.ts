import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PayloadValidationPipe implements PipeTransform {
  private isEmpty(value: any) {
    if (Object.keys(value).length < 1) {
      return true;
    } else {
      return false;
    }
  }

  private formatErrors(errors: any[]) {
    return errors
      .map((error) => {
        for (const key in error.constraints) {
          return error.constraints[key];
        }
      })
      .join(', ');
  }

  async transform(value: any, meta: ArgumentMetadata) {
    if (this.isEmpty(value)) {
      throw new BadRequestException('No payload provided');
    }

    const object = plainToClass(meta.metatype, value);
    const errors = await validate(object, {
      skipMissingProperties: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      groups: [],
      dismissDefaultMessages: false,
      validationError: {
        target: true,
        value: true,
      },
      forbidUnknownValues: true,
    });

    if (errors.length > 0) {
      throw new BadRequestException(this.formatErrors(errors));
    }

    return value;
  }
}
