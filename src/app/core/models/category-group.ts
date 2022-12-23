import { BaseAuditableModel } from './base-auditable-model';

export interface CategoryGroup extends BaseAuditableModel {
    order: number,
    name: string,
    color: string
}
