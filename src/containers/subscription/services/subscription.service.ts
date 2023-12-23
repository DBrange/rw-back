import { Injectable } from '@nestjs/common';
import { UserService } from 'src/containers/user/services/user.service';
import { MercadoPagoConfig, Payment } from 'mercadopago';

@Injectable()
export class SubscriptionService {
  constructor(private readonly userService: UserService) {}
  public async createSubscripion() {
    const client = new MercadoPagoConfig({
      accessToken:
        'TEST-199737975287477-122118-30b2d73208df35537da4cbe95621dd47-310415608',
      options: { timeout: 5000, idempotencyKey: 'abc' },
    });

    const payment = new Payment(client);

    const body = {
      transaction_amount: 12.34,
      description: 'que se yoo',
      payment_method_id: 'debit_card',
      payer: {
        email: 'asesincreedaltairr@hotmail.com',
      },
      
    };
    const result = await payment.create({ body });

    console.log(result);

    return result;
  }
}
