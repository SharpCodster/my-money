import { LogType } from "./log-types";

export interface LogEntry {
  timestamp: Date;
  type: LogType;
  message: string;
  optionalParams?: any[];
}
