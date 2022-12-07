import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class Webhooks {
  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {}

  async trigger(
    params: Synctera.Webhooks.Trigger.CreateParams,
  ): Promise<Synctera.Webhooks.Trigger.CreateResponse> {
    try {
      const resp = await this.client.post(`${this.path}/trigger`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async createSecret(
    params: Synctera.Webhooks.Secret.CreateParams,
  ): Promise<Synctera.Webhooks.Secret.CreateResponse> {
    try {
      const resp = await this.client.post(`${this.path}/secret`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async deleteSecret(): Promise<Synctera.Webhooks.Secret.CreateResponse> {
    try {
      const resp = await this.client.delete(`${this.path}/secret`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async create(
    params: Synctera.Webhooks.CreateParams,
  ): Promise<Synctera.Webhooks.CreateResponse> {
    try {
      const resp = await this.client.post(`${this.path}`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async delete(id: string): Promise<Synctera.Webhooks.DeleteResponse> {
    try {
      const resp = await this.client.delete(`${this.path}/${id}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async getAll(): Promise<{ webhooks: Synctera.Webhooks.CreateResponse[] }> {
    try {
      const resp = await this.client.get(`${this.path}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
