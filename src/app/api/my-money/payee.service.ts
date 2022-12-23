import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { UrlHelperService } from '../../core/helpers/url.helper';
import { Payee } from 'src/app/core/models/payee';

@Injectable({
  providedIn: 'root'
})
export class PayeeService extends BaseApi<Payee> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('Payees', apiService, urlHelperService);
    }
}
