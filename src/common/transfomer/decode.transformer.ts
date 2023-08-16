import { TransformFnParams } from 'class-transformer';
import { CursorService } from '../../modules/cursor/cursor.service';

const cursorService = new CursorService(); // Inject CursorService or manage its instance

export function decodeCursorValue(params: TransformFnParams): any {
  const cursorValue = params.value; // The current property value
  return cursorService.decodeCursor(cursorValue)[1];
}
