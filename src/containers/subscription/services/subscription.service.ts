import { Injectable } from '@nestjs/common';
import { UserService } from 'src/containers/user/services/user.service';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { PaymentCreateData, PaymentCreateRequest } from 'mercadopago/dist/clients/payment/create/types';

@Injectable()
export class SubscriptionService {
  constructor(private readonly userService: UserService) {}
  public async createSubscripion() {
    try {
      const client = new MercadoPagoConfig({
        accessToken:
          'TEST-6289767696248900-122118-259029387c52b6a7c15c019c19e8c45c-1603753997',
        options: { timeout: 1000, idempotencyKey: 'abc' },
      });

      const body: PaymentCreateRequest = {
        transaction_amount: 100,
        token: '123456',
        description: 'description',
        installments: 1,
        payment_method_id: 'visa',
        notification_url: 'http://reclamoweb.com/',
        payer: {
          email: 'test@test.com',
          identification: {
            type: 'CPF',
            number: '12312323',
          },
        },
      };

      const payment = new Payment(client);

      const result = await payment.create({
        body: body,
        // requestOptions: { idempotencyKey: '<SOME_UNIQUE_VALUE>' },
      });
      // const body: PaymentCreateData = {
console.log(result)
      return { id: result.id };
      // };
    } catch (error) {
      console.log(error)
    }

    
  }
}
