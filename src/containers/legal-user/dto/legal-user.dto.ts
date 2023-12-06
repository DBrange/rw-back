import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class LegalUserDTO {
  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  cuit: string; 
}

export class UpdateLegalUserDTO {
  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  cuit: string;
}
