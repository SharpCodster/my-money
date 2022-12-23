import { BaseAuditableModel } from './base-auditable-model';

export interface Tag extends BaseAuditableModel {
    name: string
}
