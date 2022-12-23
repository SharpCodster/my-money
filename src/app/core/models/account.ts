import { BaseAuditableModel } from './base-auditable-model';

export interface Account extends BaseAuditableModel {
    order: number,
    name: string,
    isActive: boolean,
    icon: string,
    color: string,
    accountBalance: number,
    avaiableBalance: number
}
