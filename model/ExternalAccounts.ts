import { AxiosInstance } from 'axios';
import { SyncteraError } from '../common.types';
import { Synctera } from '../synctera';
import AccessTokens from './AccessTokens';
import LinkTokens from './LinkTokens';
import VendorAccounts from './VendorAccounts';

export default class ExternalAccounts {
  linkTokens: LinkTokens;
  accessTokens: AccessTokens;
  vendorAccounts: VendorAccounts;

  constructor(
    private client: AxiosInstance,
    private clientName: string,
    private path: string,
  ) {
    this.linkTokens = new LinkTokens(client, clientName, `${path}/link_tokens`);
    this.accessTokens = new AccessTokens(
      client,
      clientName,
      `${path}/access_tokens`,
    );
    this.vendorAccounts = new VendorAccounts(
      client,
      clientName,
      `${path}/add_vendor_accounts`,
    );
  }

  async delete(
    externalAccountId: string,
  ): Promise<Synctera.ExternalAccounts.VendorAccounts.CreateResponse> {
    try {
      const resp = await this.client.delete(
        `${this.path}/${externalAccountId}`,
      );
      return { ...resp.data };
    } catch (e) {
      throw new SyncteraError(e?.message ?? 'Generic error');
    }
  }
}
