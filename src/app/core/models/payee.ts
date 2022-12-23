import { BaseAuditableModel } from './base-auditable-model';

export interface Payee extends BaseAuditableModel {
    name: string
}
