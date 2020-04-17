import repository from './repository';

// endpoints
import GeneralLedgerAPI from '../repositories/generalLedger.api';
import AccountReceivableApi from '../repositories/accountReceivable.api';
import Stockitem from '../repositories/stockItem.api';

export default {
  generalLedger: GeneralLedgerAPI(repository),
  accountReceivable: AccountReceivableApi(repository),
  stockItem: Stockitem(repository),
};
