import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';
import { HousekeepingEndpoints } from '~/api/repositories/housekeeping.api';
import { InventoryEndpoints } from '~/api/repositories/inventory.api';
import { StockItemEndpoints } from '~/api/repositories/stockItem.api';
import { LoginEndpoints } from '~/api/repositories/login.api';
import { PrintEndpoints } from '~/api/repositories/print.api';
import { OutletEndpoints } from '~/api/repositories/outlet.api';
import { AccountsPayableEndpoints } from './api/repositories/accountsPayable.api';

interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
  housekeeping: HousekeepingEndpoints;
  inventory: InventoryEndpoints;
  stockItem: StockItemEndpoints;
  loginAuth: LoginEndpoints;
  printLNL: PrintEndpoints;
  outlet: OutletEndpoints;
  accountsPayable: AccountsPayableEndpoints;

}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
