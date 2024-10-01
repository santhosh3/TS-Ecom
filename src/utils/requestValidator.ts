import { ClassConstructor, plainToClass } from "class-transformer";
import { ValidationError, validate } from "class-validator";

const validationError = async (
  input: any
): Promise<ValidationError[] | false> => {
  const errors = await validate(input, {
    validationError: { target: true },
  });
  return errors.length > 0 ? errors : false;
};

export const RequestValidator = async <T>(
  type: ClassConstructor<T>,
  body: any
): Promise<{
  errors: boolean | string;
  input: T;
}> => {
  const input = plainToClass(type, body);
  const errors = await validationError(input);
  if (errors) {
    const structuredErrors = errors
      .map((error: ValidationError) =>
        (Object as any).values(error.constraints)
      )
      .join(", ");
    return { errors: structuredErrors, input };
  }
  return { errors: false, input };
};
