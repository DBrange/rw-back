import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TheftTireDTO } from "./dto/theft-tire.dto";
import { TheftTire } from "./entities/theft-tire.entity";

@Injectable()
export class TheftTireService {
  constructor(
    @InjectRepository(TheftTire)
    private readonly theftTireRepository: Repository<TheftTire>,
  ) {}

  public async createTheftTire(body: TheftTireDTO): Promise<TheftTire> {
    try {
      return await this.theftTireRepository.save(body);
    } catch (error) {
      throw new Error(error);
    }
  }
}