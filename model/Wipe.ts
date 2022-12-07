import { AxiosInstance } from 'axios';
import { merge } from '../common.fn';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class Wipe {
  constructor(
    private client: AxiosInstance,
    private clientName,
    private path: string,
  ) {}

  async execute(): Promise<any> {
    try {
      const resp = await this.client.post(this.path);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
