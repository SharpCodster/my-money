import { BaseId } from "./base-id";

export interface BaseModel extends BaseId {
    createdAtUtc: Date;
    createdBy: string;
    updatedAtUtc: Date;
    updatedBy: string;
    isDeleted: boolean;
}
