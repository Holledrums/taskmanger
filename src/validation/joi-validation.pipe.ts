import {
  ArraySchema,
  BooleanSchema,
  NumberSchema,
  ObjectSchema,
  StringSchema,
} from 'joi';
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(
    private schema:
      | ObjectSchema
      | StringSchema
      | NumberSchema
      | ArraySchema
      | BooleanSchema,
  ) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      throw new BadRequestException(`Validation failed: ${error.message}`);
    }
    return value;
  }
}
