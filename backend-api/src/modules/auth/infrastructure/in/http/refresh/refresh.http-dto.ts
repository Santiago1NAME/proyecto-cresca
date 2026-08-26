import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshHttpDto {
  @IsNotEmpty()
  @IsString()
  refresh_token!: string;
}
