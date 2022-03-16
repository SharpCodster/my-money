import { Pipe, PipeTransform } from '@angular/core';
import { AccountType } from '../../core/models/account-type';

@Pipe({
  name: 'accountTypePipe'
})
export class AccountTypePipe implements PipeTransform {
  transform(value: any): any {

    switch(value) { 
        case AccountType.Bank: { 
           return "Banca";
        } 
        case AccountType.Cash: { 
           return "Contanti";
        }
        case AccountType.FoodStamp: { 
            return "Buoni Pasto";
        }
        case AccountType.ShoppingVouchers: { 
            return "Voucher";
        }  
        default: { 
           return "Standard";
        } 
     } 
  }
}
