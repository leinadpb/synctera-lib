import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class PaymentSchedules {
  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {}

  async get(
    id: any,
    customer_id: any,
  ): Promise<Synctera.PaymentSchedules.CreateResponse> {
    try {
      const resp = await this.client.get(this.path, {
        params: { id, customer_id },
      });
      console.log('resp', resp);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
  async getPayment(): Promise<Synctera.PaymentSchedules.CreateResponse> {
    try {
      const resp = await this.client.get(`${this.path}/payments`);
      console.log('resp', resp);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
  async create(
    params: Synctera.PaymentSchedules.CreateParams,
  ): Promise<Synctera.PaymentSchedules.CreateResponse> {
    try {
      const resp = await this.client.post(this.path, params);
      console.log('resp', resp);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
  async update(
    id: string,
    params: Synctera.PaymentSchedules.UpdateParams,
  ): Promise<Synctera.PaymentSchedules.CreateResponse> {
    try {
      const resp = await this.client.patch(`${this.path}/${id}`, params);
      console.log('resp', resp);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
