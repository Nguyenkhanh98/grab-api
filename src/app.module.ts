import { Module } from '@nestjs/common';
import { AppDataSource } from '@common/config/datasource.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from '@module/api.module';
import { CustomConfigModule } from '@common/config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CursorServiceProvider } from '@module/cursor/cursor.provider';

@Module({
  imports: [
    CustomConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        return AppDataSource.options;
      },
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, CursorServiceProvider],
})
export class AppModule {}
