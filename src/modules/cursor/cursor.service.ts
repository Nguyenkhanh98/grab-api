import { Injectable } from '@nestjs/common';

@Injectable()
export class CursorService {
  encodeCursor(value: string): string {
    return Buffer.from(value).toString('base64');
  }

  decodeCursor(encodedValue: string): string[] {
    return Buffer.from(encodedValue, 'base64').toString().split(':');
  }
}
