export enum NotificationAppState {
    Ready,
    Busy
}

export enum NotificationEntryLevel {
    Success,
    Info,
    Warning,
    Error,
    None
}

export interface NotificationEntry {
    level: NotificationEntryLevel;
    message: string;
  }
  