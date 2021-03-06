import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';
import { HousekeepingEndpoints } from '~/api/repositories/housekeeping.api';
import { InventoryEndpoints } from '~/api/repositories/inventory.api';
import { OutletEndpoints } from '~/api/repositories/outlet.api';
import { StockItemEndpoints } from '~/api/repositories/stockItem.api';

interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
  housekeeping: HousekeepingEndpoints;
  inventory: InventoryEndpoints;
  outlet: OutletEndpoints;
  stockItem: StockItemEndpoints;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
