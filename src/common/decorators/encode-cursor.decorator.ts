import { CursorService } from '../../modules/cursor/cursor.service';

export function EncodeCursorProperty(
  property: string,
  keyCursor: string,
): PropertyDecorator {
  return (target: any, key: string) => {
    const cursorService = new CursorService();

    const setter = function (value: any) {
      const encodedValue = cursorService.encodeCursor(`${keyCursor}:${value}`);

      // Assign the encoded value to the property
      this[property] = encodedValue;
    };

    Object.defineProperty(target, key, {
      set: setter,
    });
  };
}
