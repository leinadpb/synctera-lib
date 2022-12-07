import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';

export default class Relationships {
  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {}

  async add(
    params: Synctera.Realationships.CreateParams,
  ): Promise<Synctera.Realationships.CreateResponse> {
    try {
      const resp = await this.client.post(`${this.path}`, params);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async update(
    relationId: string,
    params: Partial<Synctera.Realationships.CreateParams>,
  ): Promise<Synctera.Realationships.CreateResponse> {
    try {
      const resp = await this.client.patch(
        `${this.path}/${relationId}`,
        params,
      );
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async delete(
    relationshipId: string,
  ): Promise<Synctera.Realationships.CreateResponse> {
    try {
      const resp = await this.client.delete(`${this.path}/${relationshipId}`);
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }

  async get(
    params: Synctera.Realationships.GetParams,
  ): Promise<Synctera.Realationships.GetResponse> {
    try {
      const resp = await this.client.get(`${this.path}`, {
        params,
      });
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
