import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";


export class TheftDTO {
  @IsNotEmpty()
  @IsString()
  time: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsString()
  reportPhoto: string;

  @IsNotEmpty()
  @IsBoolean()
  isTire: boolean;
};