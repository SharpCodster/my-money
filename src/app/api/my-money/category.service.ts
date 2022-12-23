import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { UrlHelperService } from '../../core/helpers/url.helper';
import { Category } from 'src/app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseApi<Category> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('Categories', apiService, urlHelperService);
    }
}
