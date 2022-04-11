
export enum AccountType {
    Cash = 0,
    Bank = 1,
    FoodStamp = 3,
    ShoppingVouchers = 4
  }


  export const AccountTypeLabelMapping: Record<AccountType, string> = {
    [AccountType.Cash]: "Contanti",
    [AccountType.Bank]: "Banca",
    [AccountType.FoodStamp]: "Buoni Pasto",
    [AccountType.ShoppingVouchers]: "Buoni d'acquisto"
  }