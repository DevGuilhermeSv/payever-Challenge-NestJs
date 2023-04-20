import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsEmail()
  @IsNotEmpty({
    message: 'The $property cant be null',
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'The $property cant be null',
  })
  @MinLength(2)
  @MaxLength(100, {
    message: '$property is too long! Maximal length is $constraint',
  })
  first_name: string;

  @IsString()
  @IsNotEmpty({
    message: 'The $property cant be null',
  })
  @MinLength(2)
  @MaxLength(100, {
    message: '$property is too long! Maximal length is $constraint',
  })
  last_name: string;

  @IsString()
  @MinLength(2)
  avatar: string;
}
