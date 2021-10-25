import { Injectable } from '@angular/core';

const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,6})?Z?((\+|\-)\d{2}:\d{2})?$/;

@Injectable({
  providedIn: 'root'
})
export class JsonHelper {

  constructor() { }

  parse<T>(json: string): T {

    return <T>JSON.parse(json, this.reviver);
  }

  clone<T>(item: T): T {

    if (item === null || item === undefined)
      return item;

      return this.parse<T>(JSON.stringify(item));
  }

  // https://mariusschulz.com/blog/deserializing-json-strings-as-javascript-date-objects
  private reviver(key: string, value: any) {

    if (typeof value === 'string' && dateFormat.test(value)) {
      return (new Date(value));
    }
    return value;
  }
}
