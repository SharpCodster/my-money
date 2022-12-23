import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { UrlHelperService } from '../../core/helpers/url.helper';
import { Transaction } from 'src/app/core/models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseApi<Transaction> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('Transactions', apiService, urlHelperService);
    }
}
