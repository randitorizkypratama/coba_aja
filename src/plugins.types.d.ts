import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';
import { MealCouponEndpoints } from '~/api/repositories/mealCoupon.api';
import { Stockitem } from '~/api/repositories/stockItem.api';

interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
  mealCoupon: MealCouponEndpoints;
  stockItem: Stockitem;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
