import { IsNotEmpty, IsString, IsNumber, IsPositive } from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreatePostDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdatePostDto extends PartialType(
  OmitType(CreatePostDto, ['userId'] as const),
) {}
