import repository from './repository';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import MealCouponApi from '../repositories/mealCoupon.api';
import Stockitem from '../repositories/stockItem.api';
import Outlet from '../repositories/outlet.api';

export default {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  mealCoupon: MealCouponApi(repository),
  stockItem: Stockitem(repository),
  outlet: Outlet(repository),
};
