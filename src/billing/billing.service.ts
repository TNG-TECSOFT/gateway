import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

export class BillignService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly client: ClientProxy,
  ) {}

  async getClientData(clientId: string) {
    const response = await firstValueFrom(
      this.client.send('getClienteData', clientId),
    );
    return response;
  }
}
