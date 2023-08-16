import { DecodeCursorProperty } from '@common/decorators/decode-cursor.decorator';
import { EncodeCursorProperty } from '@common/decorators/encode-cursor.decorator';
import { decodeCursorValue } from '@common/transfomer/decode.transformer';
import { encodeCursorValue } from '@common/transfomer/encode.transformer';
import { toNumberTransformer } from '@common/transfomer/to-number.transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
} from 'class-validator';

export class CreateOrderDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly source: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly destination: string;
}

class PageInfo {
  @ApiProperty()
  @IsString()
  @EncodeCursorProperty('id', 'order')
  @Transform(encodeCursorValue('order'))
  endCursor;

  @ApiProperty()
  @IsBoolean()
  hasNextPage;
}

export class Pagination<T> {
  records: T[];
  pageInfo: PageInfo;
}

export class OrderQuery {
  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(toNumberTransformer)
  first: number;

  @ApiProperty({ required: false })
  @IsOptional()
  decodeCursorValue;
  @Transform(toNumberTransformer)
  last: number;

  @ApiProperty({ required: false })
  @IsOptional()
  // @DecodeCursorProperty('after')
  @Transform(decodeCursorValue)
  after: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Transform(decodeCursorValue)
  // @DecodeCursorProperty('before')
  before: string;
}

export class OrderDTO {
  @ApiProperty()
  @IsString()
  @EncodeCursorProperty('id', 'order')
  cursor: string;

  @ApiProperty()
  @IsString()
  source: string;

  @ApiProperty()
  @IsString()
  destination: string;

  @ApiProperty()
  @IsString()
  orderType: string;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  orderTransactions: any[];

  @ApiProperty()
  user: any;
}
