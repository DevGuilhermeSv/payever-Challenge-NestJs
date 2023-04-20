import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(10)
  id: number;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  first_name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  last_name: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  avatar: string;
}
