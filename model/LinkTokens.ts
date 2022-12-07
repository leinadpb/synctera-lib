import { AxiosInstance } from 'axios';
import { merge } from '../common.fn';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class LinkTokens {
  constructor(
    private client: AxiosInstance,
    private clientName,
    private path: string,
  ) {}

  async create(
    params: Synctera.ExternalAccounts.LinkTokens.CreateParams,
  ): Promise<Synctera.ExternalAccounts.LinkTokens.CreateResponse> {
    try {
      const resp = await this.client.post(
        this.path,
        merge(params, { client_name: this.clientName }),
      );
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
