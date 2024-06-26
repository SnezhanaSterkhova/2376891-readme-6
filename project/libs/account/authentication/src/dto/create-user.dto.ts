import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUUID, Length } from 'class-validator';

import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.com'
  })
  @IsEmail({}, {message: AuthenticationValidateMessage.EmailNotValid})
  public email!: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivanov Keks',
  })
  @IsString()
  @Length(3, 50)
  public name!: string;

  @ApiProperty({
    description: 'User password',
    example: 'IvanovKeks00000',
  })
  @IsString()
  @Length(6, 12)
  public password!: string;

  @ApiProperty({
    description: 'User avatar ID',
    example: 'c3c05894-c1a9-422d-8752-4dc83b27b7b3',
  })
  @IsUUID()
  @IsOptional()
  public avatarId?: string;
}
