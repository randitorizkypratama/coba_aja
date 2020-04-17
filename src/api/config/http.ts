import repository from './repository';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import MealCouponApi from '../repositories/mealCoupon.api';

export default {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  mealCoupon: MealCouponApi(repository),
};
