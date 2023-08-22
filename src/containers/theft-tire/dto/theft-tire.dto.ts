import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { Theft } from 'src/containers/theft/entities/theft.entity';

export class TheftTireDTO {
  @IsNotEmpty()
  @IsNumber()
  tireAmount: number;

  @IsNotEmpty()
  @IsNumber()
  tireWear: number;

  @IsNotEmpty()
  @IsUUID()
  theftId: Theft;
}
