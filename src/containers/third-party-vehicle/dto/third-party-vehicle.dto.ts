import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { SinisterEntity } from 'src/containers/sinister/entities/sinister.entity';
import { ThirdPartyDriverEntity } from 'src/containers/third-party-driver/entities/third-party-driver.entity';

export class ThirdPartyVehicleDTO {
  @IsNotEmpty()
  @IsString()
  brand: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  plate: string;

  @IsNotEmpty()
  @IsString()
  insuranceCompany: string;

  @IsNotEmpty()
  @IsString()
  insurancePolicy: string;

  @IsNotEmpty()
  @IsString()
  ownerName: string;

  @IsNotEmpty()
  @IsString()
  ownerLastName: string;

  @IsNotEmpty()
  @IsString()
  ownerDni: string;

  @IsNotEmpty()
  @IsUUID()
  thirdPartyDriver: string;

  @IsNotEmpty()
  @IsUUID()
  sinister: string;
}

export class UpdateThirdPartyVehicleDTO {
  @IsOptional()
  @IsString()
  brand: string;

  @IsOptional()
  @IsString()
  model: string;

  @IsOptional()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  plate: string;

  @IsOptional()
  @IsString()
  insuranceCompany: string;

  @IsOptional()
  @IsString()
  insurancePolicy: string;

  @IsOptional()
  @IsString()
  ownerName: string;

  @IsOptional()
  @IsString()
  ownerLastName: string;

  @IsOptional()
  @IsString()
  ownerDni: string;

  @IsOptional()
  @IsUUID()
  thirdPartyDriver: string;

  @IsOptional()
  @IsUUID()
  sinister: string;
}
