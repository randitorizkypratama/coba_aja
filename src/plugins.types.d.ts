import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';
import { MealCouponEndpoints } from '~/api/repositories/mealCoupon.api';
import { StockItemEndpoints } from '~/api/repositories/stockItem.api';
import { OutletEndpoints } from '~/api/repositories/outlet.api';

interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
  mealCoupon: MealCouponEndpoints;
  stockItem: StockItemEndpoints;
  outlet: OutletEndpoints;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
