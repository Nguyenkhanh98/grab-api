import { Provider } from '@nestjs/common';
import { CursorService } from './cursor.service';

export const CursorServiceProvider: Provider = {
  provide: CursorService,
  useClass: CursorService,
};
