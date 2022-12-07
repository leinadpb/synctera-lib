import {
  CountryCodes,
  CurrencyCodes,
  Languages,
  LinkTokenType,
} from './common.types';
import moment = require('moment');
export namespace Synctera {
  export const formatDate = (date: Date): string => {
    return moment(date).format('YYYY-MM-DD');
  };

  export const formatSSN = (num: number | string): string => {
    // if input value is falsy eg if the user deletes the input, then just return
    if (!num) return String(num);

    // clean the input for any non-digit values.
    const ssn = String(num).replace(/[^\d]/g, '');

    // ssnLength is used to know when to apply our formatting for the ssn
    const ssnLength = ssn.length;

    // we need to return the value with no formatting if its less than four digits
    if (ssnLength < 4) return ssn;

    // if ssnLength is greater than 4 and less the 6 we start to return
    // the formatted number
    if (ssnLength < 6) {
      return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
    }

    // finally, if the ssnLength is greater then 6, we add the last
    // bit of formatting and return it.
    return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
  };

  export enum EventTypeExplicit {
    PAYMENT_SCHEDULE_PAYMENT_CREATED = 'PAYMENT_SCHEDULE.PAYMENT.CREATED',
  }

  export enum EventTypeWildcard {
    PAYMENT_SCHEDULE = 'PAYMENT_SCHEDULE.*',
  }

  type LegalAddress = {
    address_line_1: string;
    address_line_2?: string;
    city?: string;
    country_code: string;
    postal_code?: string;
    state?: string;
    default_address_flg?: boolean;
    type?: string;
  };

  type ShippingAddress = {
    address_line_1: string;
    address_line_2?: string;
    city?: string;
    country_code: string;
    postal_code?: string;
    state?: string;
  };

  export enum PersonStatus {
    ACTIVE = 'ACTIVE',
    DECEASED = 'DECEASED',
    DENIED = 'DENIED',
    DORMANT = 'DORMANT',
    ESCHEAT = 'ESCHEAT',
    FROZEN = 'FROZEN',
    INACTIVE = 'INACTIVE',
    PROSPECT = 'PROSPECT',
    SANCTION = 'SANCTION',
  }

  export enum BusinessStatus {
    PROSPECT = 'PROSPECT',
    ACTIVE = 'ACTIVE',
    FROZEN = 'FROZEN',
    SANCTION = 'SANCTION',
    DISSOLVED = 'DISSOLVED',
    CANCELLED = 'CANCELLED',
    SUSPENDED = 'SUSPENDED',
    MERGED = 'MERGED',
    INACTIVE = 'INACTIVE',
    CONVERTED = 'CONVERTED',
  }

  enum BusinessStructure {
    SOLE_PROPRIETORSHIP = 'SOLE_PROPRIETORSHIP',
    PARTNERSHIP = 'PARTNERSHIP',
    LLC = 'LLC',
    CORPORATION = 'CORPORATION',
    S_CORPORATION = 'S_CORPORATION',
    NON_PROFIT = 'NON_PROFIT',
    OTHER = 'OTHER',
  }

  enum SSNSource {
    MANUAL = 'MANUAL',
    PREFILL = 'PREFILL',
  }

  export enum Vendor {
    PLAID = 'PLAID',
    FINICITY = 'FINICITY',
  }

  export enum AccountType {
    SAVING = 'SAVING',
    CHECKING = 'CHECKING',
    LINE_OF_CREDIT = 'LINE_OF_CREDIT',
  }

  export enum VerificationStatus {
    // The result of a KYC/KYB verification
    UNVERIFIED = 'UNVERIFIED',
    PENDING = 'PENDING',
    PROVISIONAL = 'PROVISIONAL',
    ACCEPTED = 'ACCEPTED',
    REVIEW = 'REVIEW',
    REJECTED = 'REJECTED',
  }

  type VendorInfo = {
    content_type: 'application/json' | 'xml';
    vendor: string;
    json?: string;
    xml?: string;
  };

  export enum CustomerType {
    PERSONAL = 'PERSONAL',
    BUSINESS = 'BUSINESS',
  }

  export enum ApplicationType {
    LINE_OF_CREDIT = 'LINE_OF_CREDIT',
    RESTRICTED_ACCOUNT = 'RESTRICTED_ACCOUNT',
  }

  export namespace Accounts {
    export enum Status {
      APPLICATION_SUBMITTED = 'APPLICATION_SUBMITTED',
      FAILED_KYC = 'FAILED_KYC',
      ACCOUNT_NOT_DESIRED = 'ACCOUNT_NOT_DESIRED',
      ACTIVE_OR_DISBURSED = 'ACTIVE_OR_DISBURSED',
      CLOSED = 'CLOSED',
      SUSPENDED = 'SUSPENDED',
      CHARGED_OFF = 'CHARGED_OFF',
      ACCOUNT_NEVER_ACTIVE = 'ACCOUNT_NEVER_ACTIVE',
      ACTIVATED_NOT_DISBURSED = 'ACTIVATED_NOT_DISBURSED',
      AWAITING_FIXING = 'AWAITING_FIXING',
      IN_CLOSING = 'IN_CLOSING',
      RESTRICTED = 'RESTRICTED',
      DELINQUENT = 'DELINQUENT',
    }

    export enum RelationshipType {
      PRIMARY_ACCOUNT_HOLDER = 'PRIMARY_ACCOUNT_HOLDER',
      AUTHORIZED_USER = 'AUTHORIZED_USER',
    }

    export type Relationship = {
      relationship_type: RelationshipType;
      customer_id?: string;
      business_id?: string;
    };

    export enum AccessStatus {
      ACTIVE = 'ACTIVE',
      FROZEN = 'FROZEN',
    }

    export type BalanceTop = {
      balance: number;
      linked_account_id: string;
    };

    export enum BalanceType {
      ACCOUNT_BALANCE = 'ACCOUNT_BALANCE',
      AVAILABLE_BALANCE = 'AVAILABLE_BALANCE',
    }

    export type Balance = {
      balance: number;
      type: BalanceType;
    };

    export enum BillingPeriodFrequence {
      ANNUALLY = 'ANNUALLY',
      MONTHLY = 'MONTHLY',
      SEMI_MONTHLY = 'SEMI_MONTHLY',
      BI_WEEKLY = 'BI_WEEKLY',
      WEEKLY = 'WEEKLY',
      DAILY = 'DAILY',
    }

    export type BillingPeriod = {
      frequency: BillingPeriodFrequence;
      start_date: string;
    };

    export type MinimunPayment = {
      min_amount: number; // The maximum amount to charge as a minimum payment, in cents. For example, to set the maximum to $30, set this value to 3000.
      rate: number; //The percentage of the balance to use, in basis points. For example, to set 12.5% of the balance, set this value to 1250.
      type: 'RATE_OR_AMOUNT';
    };

    export type SpendingLimitObject = {
      amount: number;
      transactions?: number;
    };

    export type SpendingLimit = {
      day: SpendingLimitObject;
      description: string;
      lifetime: SpendingLimitObject;
      month: SpendingLimitObject;
      week: SpendingLimitObject;
      transaction: SpendingLimitObject;
    };

    export type CreateParams = {
      account_type?: AccountType;
      access_status?: AccessStatus;
      relationships: Relationship[];
      account_template_id?: string;
      application_id?: string;
    };

    export type CreateResponse = {
      access_status: AccessStatus;
      access_status_last_updated_time: Date;
      account_number: string;
      account_number_masked: string;
      account_purpose?: string;
      account_type: AccountType;
      application_id?: string;
      balance_ceiling: BalanceTop;
      balance_floor: BalanceTop;
      balances: Balance[];
      bank_routing: string;
      billing_period: BillingPeriod;
      business_ids: string[];
      chargeoff_period: number;
      creation_time: Date;
      credit_limit: number;
      currency: string;
      customer_ids: string[];
      customer_type: CustomerType;
      delinquency_period: number;
      exchange_rate_type: string;
      fee_product_ids: string[];
      grace_period: number;
      iban: string;
      id: string;
      interest_product_id: string;
      is_account_pool: boolean;
      is_ach_enabled: boolean;
      is_card_enabled: boolean;
      is_p2p_enabled: boolean;
      is_wire_enabled: boolean;
      last_updated_time: Date;
      metadata: any;
      minimum_payment: MinimunPayment;
      nickname: string;
      overdraft_limit: number;
      spend_control_ids: string[];
      spending_limits: SpendingLimit;
      status: Status;
      swift_code: string;
    };

    export namespace Templates {
      export type Checking = {
        account_type: AccountType;
        bank_country: CountryCodes;
        currency: CurrencyCodes;
        balance_ceiling?: BalanceTop;
        balance_floor?: BalanceTop;
        is_ach_enabled?: boolean;
        is_card_enabled?: boolean;
        is_p2p_enabled?: boolean;
        is_wire_enabled?: boolean;
        overdraft_limit?: number;
        spend_control_ids?: string[];
        spending_limits?: SpendingLimit;
      };

      export type CreateParams = {
        application_type?: ApplicationType;
        description?: string;
        is_enabled: boolean;
        name: string;
        template: Checking;
      };

      export type CreateResponse = {
        application_type: ApplicationType;
        description: string;
        id: string;
        is_enabled: boolean;
        name: string;
        template: Checking;
      };
    }
  }

  export namespace Persons {
    enum BanStatus {
      BANNED = 'BANNED',
      ALLOWED = 'ALLOWED',
    }

    export type CreateParams = {
      email: string;
      is_customer: boolean;
      dob?: string; // full-date format (YYYY-MM-DD)
      first_name?: string;
      last_name?: string;
      middle_name?: string;
      legal_address?: LegalAddress;
      metadata?: any;
      phone_number?: string;
      shipping_address?: ShippingAddress;
      ssn?: string;
      status: PersonStatus;
      tenant?: string;
    };

    export type CreateResponse = {
      ban_status?: BanStatus;
      creation_time?: Date;
      dob?: Date;
      email?: string;
      first_name?: string;
      id?: string;
      is_customer: boolean;
      last_name?: string;
      last_updated_time?: Date;
      legal_address?: LegalAddress;
      metadata?: any;
      middle_name?: string;
      phone_number?: string;
      shippingAddress?: ShippingAddress;
      ssn?: string;
      ssn_source?: SSNSource;
      status: PersonStatus;
      tenant?: string;
      verification_last_run?: Date;
      verification_status?: VerificationStatus;
    };
  }
  export namespace ExternalAccounts {
    export namespace AccessTokens {
      export type CreateParams = {
        business_id?: string;
        customer_id?: string;
        vendor_customer_id?: string;
        vendor_institution_id: string;
        vendor_public_token: string;
      };

      export type CreateResponse = {
        business_id?: string;
        customer_id?: string;
        request_id?: string;
        vendor_customer_id?: string;
        vendor_institution_id: string;
        vendor_public_token: string;
        vendor_access_token?: string;
      };
    }

    export namespace VendorAccounts {
      type AccountIdentifier = {
        iban: string;
        number: string;
      };

      type RoutingIdentifier = {
        ach_routing_number: string;
        bank_countries: string[];
        bank_name: string;
        eft_routing_number: string;
        swift_code: string;
        wire_routing_number: string;
      };

      enum VendorStatus {
        ACTIVE = 'ACTIVE',
        CLOSED = 'CLOSED',
      }

      enum VendorType {
        CHECKING = 'CHECKING',
        SAVINGS = 'SAVINGS',
        CREDIT_CARD = 'CREDIT_CARD',
        MONEY_MARKET = 'MONEY_MARKET',
        INVESTMENT_529 = 'INVESTMENT_529',
        OTHER = 'OTHER',
      }

      type VendorData = {
        account_number_mask: string;
        institution_id: string;
      };

      type VendorAccount = {
        account_identifiers: AccountIdentifier;
        account_owner_names: string[];
        business_id: string;
        creation_time: Date;
        customer_id: string;
        id: string;
        last_updated_time: Date;
        metadata?: any;
        name: string;
        nickname: string;
        routing_identifiers: RoutingIdentifier;
        status: VendorStatus;
        type: VendorType;
        vendor_data: VendorData;
        vendor_info: any;
        verification: any;
      };

      export type CreateParams = {
        business_id?: string;
        customer_id?: string;
        customer_type: CustomerType;
        vendor: Vendor;
        // The token provided to link external accounts. For Plaid, this is their access_token.
        vendor_access_token: string;
        // The list of vendor account IDs that the customer chose to link. For Plaid, these are account_ids.
        vendor_account_ids: string[];
        // The identifier provided by the vendor for the customer associated with this external account.
        vendor_customer_id: string;
        verify_owner: boolean;
      };

      export type CreateResponse = {
        added_accounts: VendorAccount[];
        deleted_accounts: VendorAccount[];
        failed_accounts: VendorAccount[];
      };
    }
    export namespace LinkTokens {
      export type CreateParams = {
        client_name?: string;
        customer_id?: string;
        business_id?: string;
        country_codes: CountryCodes[];
        type: LinkTokenType;
        language: Languages;
        link_customization_name?: string;
      };

      export type CreateResponse = {
        customer_id?: string;
        business_id?: string;
        client_name: string;
        country_codes: CountryCodes[];
        expiration: Date;
        language: Languages;
        request_id: string;
        type: LinkTokenType;
        vendor_access_token: string;
        vendor_institution_id: string;
        verify_owner: string;
        link_token: string;
      };
    }
  }
  export namespace Businesses {
    export type CreateParams = {
      ein?: string;
      email?: string;
      entity_name?: string;
      formation_date?: Date;
      formation_state?: string;
      is_customer: boolean;
      legal_address?: LegalAddress;
      metadata?: any;
      phone_number?: string;
      status: BusinessStatus;
      structure?: BusinessStructure;
      website?: string;
      trade_names?: string[];
    };

    export type CreateResponse = {
      creation_time?: string;
      ein?: string;
      email?: string;
      entity_name?: string;
      formation_date?: Date;
      formation_state?: string;
      id?: string;
      is_customer: boolean;
      last_updated_time?: Date;
      legal_address?: LegalAddress;
      metadata?: any;
      phone_number?: string;
      status?: BusinessStatus;
      structure?: BusinessStructure;
      trade_names?: string[];
      verification_last_run?: Date;
      verification_status?: VerificationStatus;
      website?: string;
    };
  }

  export namespace Disclosures {
    export enum DisclosureEventType {
      DISPLAYED = 'DISPLAYED',
      VIEWED = 'VIEWED',
      ACKNOWLEDGED = 'ACKNOWLEDGED',
    }

    export enum DisclosureType {
      ACH_AUTHORIZATION = 'ACH_AUTHORIZATION',
      CARDHOLDER_AGREEMENT = 'CARDHOLDER_AGREEMENT',
      E_SIGN = 'E_SIGN',
      KYC_DATA_COLLECTION = 'KYC_DATA_COLLECTION',
      PRIVACY_NOTICE = 'PRIVACY_NOTICE',
      REG_CC = 'REG_CC',
      REG_DD = 'REG_DD',
      REG_E = 'REG_E',
      TERMS_AND_CONDITIONS = 'TERMS_AND_CONDITIONS',
    }

    export type CreateParams = {
      business_id?: string;
      disclosure_date: Date; // date-time, Ex: 2021-06-14T11:21:17Z
      event_type: DisclosureEventType;
      metadata?: any;
      person_id?: string;
      type: DisclosureType;
      version: string;
    };

    export type CreateResponse = {
      business_id?: string;
      creation_time?: Date;
      disclosure_date?: Date;
      event_type?: DisclosureEventType;
      id?: string;
      last_updated_time?: Date;
      metadata?: any;
      person_id?: string;
      type: DisclosureType;
      version: string;
    };
  }

  export namespace Verifications {
    enum VerificationDetailResult {
      PASS = 'PASS',
      WARN = 'WARN',
      FAIL = 'FAIL',
    }

    export enum VerificationResult {
      PENDING = 'PENDING',
      PROVISIONAL = 'PROVISIONAL',
      ACCEPTED = 'ACCEPTED',
      REVIEW = 'REVIEW',
      VENDOR_ERROR = 'VENDOR_ERROR',
      REJECTED = 'REJECTED',
    }

    enum VerificationType {
      IDENTITY = 'IDENTITY',
      WATCHLIST = 'WATCHLIST',
      RELATED_ENTITIES = 'RELATED_ENTITIES',
      MANUAL_REVIEW = 'MANUAL_REVIEW',
    }

    type VerificationDetail = {
      description?: string;
      label?: string;
      result?: VerificationDetailResult;
      vendor_code?: string;
    };

    type Verification = {
      business_id?: string;
      creation_time?: Date;
      details?: VerificationDetail[];
      id?: string;
      last_updated_time?: Date;
      metadata?: any;
      person_id?: string;
      result: VerificationResult;
      vendor_info: VendorInfo;
      verification_time: Date;
      verification_type: VerificationType;
      next_page_token?: string;
    };

    export type VerifyParams = {
      business_id?: string;
      customer_consent: boolean;
      customer_ip_address?: string;
      document_id?: string;
      person_id?: string;
    };

    export type VerifyResponse = {
      verification_status: VerificationStatus;
      verifications: Verification[];
    };
  }

  export namespace Realationships {
    export type AdditionalData = {
      percent_ownership: number;
    };

    export enum RelationshipType {
      BENEFICIAL_OWNER_OF = 'BENEFICIAL_OWNER_OF',
      MANAGING_PERSON_OF = 'MANAGING_PERSON_OF',
      OWNER_OF = 'OWNER_OF',
    }

    export type CreateParams = {
      additional_data: AdditionalData;
      from_person_id: string;
      metadata?: unknown;
      relationship_type: RelationshipType;
      to_business_id: string;
    };

    export type CreateResponse = {
      additional_data: AdditionalData;
      creation_time: string;
      from_person_id: string;
      id: string;
      metadata: unknown;
      relationship_type: RelationshipType;
      to_business_id: string;
    };

    export type GetParams = {
      id?: string; // Multiple IDs can be provided as a comma-separated list.
      from_person_id?: string; // Multiple IDs can be provided as a comma-separated list.
      from_business_id?: string; // Multiple IDs can be provided as a comma-separated list.
      to_business_id?: string; // Multiple IDs can be provided as a comma-separated list.
      relationship_type?: RelationshipType;
      limi?: number;
      page_token?: string;
    };

    export type GetResponse = {
      relationships: CreateResponse[];
    };
  }

  export namespace PaymentSchedules {
    export enum PaymentInstructionType {
      ACH = 'ACH',
      INTERNAL_TRANSFER = 'INTERNAL_TRANSFER',
    }
    export enum Frequency {
      DAILY = 'DAILY',
      WEEKLY = 'WEEKLY',
      MONTHLY = 'MONTHLY',
    }
    export enum DcSign {
      DEBIT = 'debit',
      CREDIT = 'credit',
    }
    type Hold = {
      amount: number;
      duration: number;
    };
    export enum TypeTransaction {
      ACCOUNT_TO_ACCOUNT = 'ACCOUNT_TO_ACCOUNT',
      ACH_CREDIT_SWEEP = 'ACH_CREDIT_SWEEP',
      ACH_DEBIT_SWEEP = 'ACH_DEBIT_SWEEP',
      ACH_FLOAT_TRANSFER = 'ACH_FLOAT_TRANSFER',
      CASHBACK = 'CASHBACK',
      FEE = 'FEE',
      INCOMING_WIRE = 'INCOMING_WIRE',
      INTEREST_PAYOUT = 'INTEREST_PAYOUT',
      MANUAL_ADJUSTMENT = 'MANUAL_ADJUSTMENT',
      MANUAL_ADJUSTMENT_REVERSAL = 'MANUAL_ADJUSTMENT_REVERSAL',
      OUTGOING_INTERNATIONAL_REMITTANCE = 'OUTGOING_INTERNATIONAL_REMITTANCE',
      OUTGOING_INTERNATIONAL_REMITTANCE_REVERSAL = 'OUTGOING_INTERNATIONAL_REMITTANCE_REVERSAL',
      PROMOTIONAL_CREDIT = 'PROMOTIONAL_CREDIT',
      SIGN_UP_BONUS = 'SIGN_UP_BONUS',
      SUBSCRIPTION_FEE = 'SUBSCRIPTION_FEE',
      TRANSFER_FEE = 'TRANSFER_FEE',
      TRANSFER_FEE_REVERSAL = 'TRANSFER_FEE_REVERSAL',
      WIRE_SETTLEMENT_CREDIT = 'WIRE_SETTLEMENT_CREDIT',
      WIRE_SETTLEMENT_DEBIT = 'WIRE_SETTLEMENT_DEBIT',
    }
    type ACH = {
      hold?: Hold;
      amount: number;
      company_entry_description?: string; //"PAYROLL",
      currency: string; //"USD" ISO 4217 alphabetic currency code of the transfer amount,
      customer_id: string;
      dc_sign: DcSign;
      effective_date?: string; //"2022-03-18",
      is_same_day?: boolean; //true,Send as same day ACH transaction (use only is_same_day without specific effective_date)
      originating_account_id: string; //
      receiving_account_id: string; //
      reference_info?: string; //Will be sent to the ACH network and maps to Addenda record 05 - the recipient bank will receive this info
    };
    type INTERNAL_TRANSFER = {
      amount: number;
      currency: string; //"USD" ISO 4217 alphabetic currency code of the transfer amount,
      originating_account_alias?: string;
      originating_account_id?: string;
      receiving_account_alias?: string;
      receiving_account_id?: string;
      type: TypeTransaction;
    };
    type PaymentInstruction = {
      request: ACH | INTERNAL_TRANSFER;
      type: PaymentInstructionType;
    };
    type Schedule = {
      count?: number;
      end_date?: string; //"2023-10-10",
      frequency: Frequency;
      interval: number;
      start_date: string; //"2023-01-01"
    };
    export type CreateParams = {
      payment_instruction: PaymentInstruction;
      schedule: Schedule;
      description: string;
      metadata?: any;
    };

    export type CreateResponse = {
      id: string;
      next_payment_date: any;
      schedule: Schedule;
    };
    export type UpdateParams = {
      status: string;
    };

    type PaymentDate = {
      execution_date: Date;
      scheduled_date: Date;
    };

    export type Payment = {
      description: string;
      error_details: any;
      id: string;
      metadata: any;
      payment_date: PaymentDate;
      payment_instruction: PaymentInstruction;
      payment_schedule_id: string;
      status: 'COMPLETED' | 'ERROR';
      transaction_id: string;
    };
  }

  export namespace Webhooks {
    export type DeleteResponse = {
      id: string;
      resource: any;
    };

    export type CreateParams = {
      description?: string;
      enabled_events: (EventTypeExplicit | EventTypeWildcard)[];
      is_enabled: boolean;
      metadata?: any;
      url: string;
    };

    export type CreateResponse = {
      description?: string;
      enabled_events: (EventTypeExplicit | EventTypeWildcard)[];
      id: string;
      is_enabled: boolean;
      last_updated: Date;
      metadata?: any;
      url: string;
    };
    export namespace Secret {
      export type CreateParams = {};
      export type CreateResponse = {
        secret: string;
      };
    }

    export namespace Trigger {
      export type CreateParams = {
        event: Synctera.EventTypeWildcard | Synctera.EventTypeExplicit;
      };
      export type CreateResponse = {
        event_time: Date;
        id: string;
        type: Synctera.EventTypeWildcard | Synctera.EventTypeExplicit;
      };
    }
  }
}
