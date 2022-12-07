import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class AccountTemplates {
  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {}

  async getById(
    id: string,
  ): Promise<Synctera.Accounts.Templates.CreateResponse> {
    try {
      const resp = await this.client.get(`${this.path}/${id}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async create(
    params: Synctera.Accounts.Templates.CreateParams,
  ): Promise<Synctera.Accounts.Templates.CreateResponse> {
    try {
      const resp = await this.client.post(this.path, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async update(
    id: string,
    params: Synctera.Accounts.Templates.CreateParams,
  ): Promise<Synctera.Accounts.Templates.CreateResponse> {
    try {
      const resp = await this.client.patch(`${this.path}/${id}`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async delete(
    id: string,
  ): Promise<Synctera.Accounts.Templates.CreateResponse> {
    try {
      const resp = await this.client.delete(`${this.path}/${id}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
