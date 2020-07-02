import repository from './repository';
import { ApiEndpoints } from '~/plugins.types';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import HousekeepingApi from '../repositories/housekeeping.api';
import InventoryEndpoints from '../repositories/inventory.api';
import AccountsPayableApi from '../repositories/accountsPayable.api';

const http: ApiEndpoints = {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  housekeeping: HousekeepingApi(repository),
  accountsPayable: AccountsPayableApi(repository),
  inventory: InventoryEndpoints(repository),
};

export default http;
