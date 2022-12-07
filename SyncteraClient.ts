import axios, { AxiosInstance } from 'axios';
import { SyncteraError } from './common.types';
import Accounts from './model/Accounts';
import Businesses from './model/Businesses';
import Disclosures from './model/Disclosures';
import ExternalAccounts from './model/ExternalAccounts';
import Persons from './model/Persons';
import Verifications from './model/Verifications';
import PaymentSchedules from './model/PaymentSchedules';
import Webhooks from './model/Webhooks';
import AccountsTemplates from './model/AccountTemplates';
import Relationships from './model/Relationships';
import Wipe from './model/Wipe';

export default class SyncteraClient {
  private axiosClient: AxiosInstance;
  externalAccounts: ExternalAccounts;
  persons: Persons;
  businesses: Businesses;
  disclosures: Disclosures;
  verifications: Verifications;
  paymentSchedules: PaymentSchedules;
  accounts: Accounts;
  webhooks: Webhooks;
  accountsTemplate: AccountsTemplates;
  relationships: Relationships;
  wipe: Wipe;

  constructor(
    token: string,
    baseUrl: string,
    version: string,
    clientName: string,
  ) {
    if (!token) {
      throw new SyncteraError('Token not specified.');
    }
    if (!baseUrl) {
      throw new SyncteraError('Base url not specified.');
    }
    if (!version) {
      throw new SyncteraError('Version not specified.');
    }

    if (!token.includes('Bearer')) {
      throw new SyncteraError('Token should start with: "Bearer ".');
    }

    if (!clientName) {
      throw new SyncteraError('Client name missing.');
    }

    this.axiosClient = axios.create({
      baseURL: `${baseUrl}/${version}`,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    this.axiosClient.interceptors.response.use(
      (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      (error) => {
        console.log('error', error?.response?.data);
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
      },
    );

    this.externalAccounts = new ExternalAccounts(
      this.axiosClient,
      clientName,
      '/external_accounts',
    );
    this.persons = new Persons(this.axiosClient, clientName, '/persons');

    this.businesses = new Businesses(
      this.axiosClient,
      clientName,
      '/businesses',
    );

    this.disclosures = new Disclosures(
      this.axiosClient,
      clientName,
      '/disclosures',
    );

    this.verifications = new Verifications(
      this.axiosClient,
      clientName,
      '/verifications',
    );

    this.paymentSchedules = new PaymentSchedules(
      this.axiosClient,
      clientName,
      '/payment_schedules',
    );

    this.accountsTemplate = new AccountsTemplates(
      this.axiosClient,
      clientName,
      '/accounts/templates',
    );
    this.accounts = new Accounts(this.axiosClient, clientName, '/accounts');

    this.webhooks = new Webhooks(this.axiosClient, clientName, '/webhooks');

    this.relationships = new Relationships(
      this.axiosClient,
      clientName,
      '/relationships',
    );

    this.wipe = new Wipe(this.axiosClient, clientName, '/wipe');
  }
}
