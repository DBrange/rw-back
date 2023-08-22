import { Injectable } from '@nestjs/common';
import { TheftService } from '../../theft/theft.service';
import { TheftTireService } from 'src/containers/theft-tire/theft-tire.service';
import { TheftDTO } from 'src/containers/theft/dto/theft.dto';
import { TheftTireDTO } from 'src/containers/theft-tire/dto/theftTire.dto';

@Injectable()
export class TheftTheftTireService {
  constructor(
    private readonly theftService: TheftService,
    private readonly theftTireService: TheftTireService,
  ) {}

  public async createTheftTheftTire(
    theftData: TheftDTO,
    theftTireData: TheftTireDTO,
  ) {
    try {
      const newTheft = await this.theftService.createTheft(theftData);

      const theftTheftTire = {
        ...theftTireData,
        theft: newTheft.id,
      };

      const theftTire = await this.theftTireService.createTheftTire(
        theftTheftTire,
      );

      return { newTheft, theftTire };
    } catch (error) {
      throw new Error(error);
    }
  }
}
