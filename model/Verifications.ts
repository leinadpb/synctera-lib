import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class Verifications {
  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {}

  async verify(
    params: Synctera.Verifications.VerifyParams,
  ): Promise<Synctera.Verifications.VerifyResponse> {
    try {
      const resp = await this.client.post(`${this.path}/verify`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async getById(id: string): Promise<Synctera.Verifications.VerifyResponse> {
    try {
      const resp = await this.client.get(`${this.path}/${id}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
