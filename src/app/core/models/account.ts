import { BaseModel } from './base-model';
import { AccountType } from './account-type';

export interface Account extends BaseModel {
    order: number,
    name: string,
    isActive: boolean,
    icon: string,
    color: string,
    type: AccountType
}
