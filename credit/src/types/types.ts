export interface BasicDetails {
  name: string;
  mobilePhone: string;
  pan: string;
  creditScore: number;
}

export interface ReportSummary {
  totalAccounts: number;
  activeAccounts: number;
  closedAccounts: number;
  currentBalanceAmount: number;
  securedAccountsAmount: number;
  unsecuredAccountsAmount: number;
  lastSevenDaysEnquiries: number;
}

export interface CreditAccount {
  creditCard: string;
  bank: string;
  address: string;
  accountNumber: string;
  amountOverdue: number;
  currentBalance: number;
}

export interface CreditReport {
  _id: string;
  basicDetails: BasicDetails;
  reportSummary: ReportSummary;
  creditAccounts: CreditAccount[];
  createdAt: string;
}