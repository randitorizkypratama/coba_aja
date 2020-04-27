import repository from './repository';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import HousekeepingApi from '../repositories/housekeeping.api';
import InventoryEndpoints from '../repositories/inventory.api';
import OutletEndpoints from '../repositories/outlet.api';

export default {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  housekeeping: HousekeepingApi(repository),
  inventory: InventoryEndpoints(repository),
  outlet: OutletEndpoints(repository),
};
