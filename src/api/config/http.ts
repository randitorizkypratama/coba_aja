import repository from './repository';
import login from './login';
import print from './print';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import HousekeepingApi from '../repositories/housekeeping.api';
import InventoryEndpoints from '../repositories/inventory.api';
import OutletEndpoints from '../repositories/outlet.api';
import stockItemEndPoint from '../repositories/stockItem.api';
import LoginAPI from '../repositories/login.api';
import PrintAPI from '../repositories/print.api';

export default {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  housekeeping: HousekeepingApi(repository),
  inventory: InventoryEndpoints(repository),
  outlet: OutletEndpoints(repository),
  stockItem: stockItemEndPoint(repository),
  loginAuth: LoginAPI(login),
  printLNL: PrintAPI(print),
};
