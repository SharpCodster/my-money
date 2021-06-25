import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { LogEntry } from './log-entry';
import { LogType } from './log-types';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {

  private logEntries: LogEntry[] = [];

  constructor(private datePipe: DatePipe) {
    console.info('New Log Service constructed.');
  }

  public error(message?: any, ...optionalParams: any[]): void {
    message = this.prefixMessage(message);

    if (optionalParams.length) {
      console.error(message, optionalParams);
    } else {
      console.error(message);
    }

    this.pushLogEntry(LogType.Error, message, optionalParams);
  }

  public info(message?: any, ...optionalParams: any[]): void {
    message = this.prefixMessage(message);

    if (optionalParams.length) {
      console.info(message, optionalParams);
    } else {
      console.info(message);
    }

    this.pushLogEntry(LogType.Info, message, optionalParams);
  }

  public warn(message?: any, ...optionalParams: any[]): void {
    message = this.prefixMessage(message);

    if (optionalParams.length) {
      console.warn(message, optionalParams);
    } else {
      console.warn(message);
    }

    this.pushLogEntry(LogType.Warning, message, optionalParams);
  }

  public debug(message?: any, ...optionalParams: any[]): void {
    this.pushLogEntry(LogType.Debug, message, optionalParams);

    message = this.prefixMessage(message);

    if (optionalParams.length) {
      console.debug(message, optionalParams);
    } else {
      console.debug(message);
    }
  }

  public getLogEntries(): LogEntry[] {
    return Object.assign([], this.logEntries);
  }

  private prefixMessage(message: string): string {
    return `MyMoney | ${this.datePipe.transform(new Date, 'HH:mm:ss.SSSS')} | ${message}`;
  }

  private pushLogEntry(logType: LogType, message?: any, ...optionalParams: any[]): void {
    if (this.logEntries.length > 50) {
      this.logEntries.shift();
    }

    const entry: LogEntry = {
      timestamp: new Date(),
      type: logType,
      message: message,
      optionalParams: optionalParams
    };

    this.logEntries.push(entry);
  }
}
