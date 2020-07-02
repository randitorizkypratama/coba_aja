import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';
import { HousekeepingEndpoints } from '~/api/repositories/housekeeping.api';
import { AccountsPayableEndpoints } from './api/repositories/accountsPayable.api';
import { InventoryEndpoints } from '~/api/repositories/inventory.api';

export interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
  housekeeping: HousekeepingEndpoints;
  accountsPayable: AccountsPayableEndpoints;
  inventory: InventoryEndpoints;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
