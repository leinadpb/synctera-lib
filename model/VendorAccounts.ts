import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class VendorAccounts {
  constructor(
    private client: AxiosInstance,
    private clientName,
    private path: string,
  ) {}

  async create(
    params: Synctera.ExternalAccounts.VendorAccounts.CreateParams,
  ): Promise<Synctera.ExternalAccounts.VendorAccounts.CreateResponse> {
    try {
      const resp = await this.client.post(this.path, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
