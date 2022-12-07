import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';
import AccountTemplates from './AccountTemplates';

export default class Accounts {
  templates: AccountTemplates;

  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {
    this.templates = new AccountTemplates(
      client,
      clientName,
      `${path}/templates`,
    );
  }

  async getById(id: string): Promise<Synctera.Accounts.CreateResponse> {
    try {
      const resp = await this.client.get(`${this.path}/${id}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async create(
    params: Synctera.Accounts.CreateParams,
  ): Promise<Synctera.Accounts.CreateResponse> {
    try {
      const resp = await this.client.post(this.path, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async update(
    id: string,
    params: Synctera.Accounts.CreateParams,
  ): Promise<Synctera.Accounts.CreateResponse> {
    try {
      const resp = await this.client.patch(`${this.path}/${id}`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
