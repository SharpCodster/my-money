import { BaseAuditableModel } from './base-auditable-model';

export interface Account extends BaseAuditableModel {
    name: string,
    isActive: boolean,
    balanceSheetType: string | null,
    cashFlowType: string | null,
}
