import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class Accesstokens {
  constructor(
    private client: AxiosInstance,
    private clientName,
    private path: string,
  ) {}

  async create(
    params: Synctera.ExternalAccounts.AccessTokens.CreateParams,
  ): Promise<Synctera.ExternalAccounts.AccessTokens.CreateResponse> {
    try {
      const resp = await this.client.post(this.path, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
