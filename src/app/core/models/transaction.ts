import { Account } from './account';
import { BaseAuditableModel } from './base-auditable-model';
import { Category } from './category';
import { Payee } from './payee';
import { Tag } from './tag';

export interface Transaction extends BaseAuditableModel {
    valueDate: Date,
    registrationDate: Date,
    account: Account,
    category: Category,
    inflow: number,
    outflow: number,
    payee: Payee,
    isClosed: boolean,
    notes: string,
    tags: Tag[]
}
