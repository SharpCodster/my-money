import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { BaseApi } from '../base-api';
import { UrlHelperService } from '../../core/helpers/url.helper';
import { Tag } from 'src/app/core/models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagService extends BaseApi<Tag> {

    constructor(
        apiService: ApiService,
        urlHelperService: UrlHelperService
        ) {
        super('Tags', apiService, urlHelperService);
    }
}
