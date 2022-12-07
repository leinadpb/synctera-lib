import { BadRequestException } from '@nestjs/common';

export class SyncteraError extends BadRequestException {
  constructor(msg: string) {
    super(`Synctera:: ${msg}`);
  }
}

export enum CountryCodes {
  US = 'US',
}

export enum CurrencyCodes {
  USD = 'USD',
}

export enum Languages {
  EN = 'EN',
}

export enum LinkTokenType {
  DEPOSITORY = 'DEPOSITORY', // for checking and savings accounts
  CREDIT = 'CREDIT',
  INVESTMENT = 'INVESTMENT',
  MICRO_DEPOSIT = 'MICRO_DEPOSIT',
}
