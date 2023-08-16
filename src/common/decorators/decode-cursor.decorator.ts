import { CursorService } from '../../modules/cursor/cursor.service';

export function DecodeCursorProperty(property: string): PropertyDecorator {
  return (target: any, key: string) => {
    const cursorService = new CursorService(); // Inject CursorService or manage its instance

    const getter = function () {
      // Retrieve the encoded cursor value from the property
      const encodedValue = this[property];

      // Decode the cursor value using the CursorService
      const decodedValue = cursorService.decodeCursor(encodedValue);

      return decodedValue[1];
    };

    Object.defineProperty(target, key, {
      get: getter,
    });
  };
}
