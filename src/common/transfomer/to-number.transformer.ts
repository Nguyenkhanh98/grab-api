import { TransformFnParams } from 'class-transformer';

export function toNumberTransformer(params: TransformFnParams): any {
  return parseInt(params.value, 10);
}
