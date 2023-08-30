import { IsNotEmpty, IsNumber, IsUUID, IsString } from 'class-validator';
import { Theft } from 'src/containers/theft/entities/theft.entity';

export class TheftTireDTO {
  @IsNotEmpty()
  @IsNumber()
  tireAmount: number;

  @IsNotEmpty()
  @IsNumber()
  tireWear: number;

  @IsNotEmpty()
  @IsString()
  tirePhoto: string;

  @IsNotEmpty()
  @IsString()
  replacementLocation: string;

  @IsNotEmpty()
  @IsUUID()
  theftId: Theft;
}
