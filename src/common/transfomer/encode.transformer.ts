import { TransformFnParams } from 'class-transformer';
import { CursorService } from '../../modules/cursor/cursor.service';

const cursorService = new CursorService(); // Inject CursorService or manage its instance

export function encodeCursorValue(key): any {
  return (params: TransformFnParams) => {
    const encodedValue = cursorService.encodeCursor(`${key}:${params.value}`);
    return encodedValue;
  };
}
