import { BaseAuditableModel } from './base-auditable-model';
import { CategoryGroup } from './category-group';

export interface Category extends BaseAuditableModel {
    order: number,
    name: string,
    group: CategoryGroup
}
