import { BaseId } from "./base-id";

export interface BaseAuditableModel extends BaseId {
    createdAtUtc: Date;
    createdBy: string;
    updatedAtUtc: Date;
    updatedBy: string;
    isDeleted: boolean;
}
