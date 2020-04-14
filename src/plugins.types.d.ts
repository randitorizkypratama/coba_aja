import { GeneralLedgerEndpoints } from '~/api/repositories/generalLedger.api';
import { AccountReceivableEndpoints } from '~/api/repositories/accountReceivable.api';

interface ApiEndpoints {
  generalLedger: GeneralLedgerEndpoints;
  accountReceivable: AccountReceivableEndpoints;
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: ApiEndpoints;
  }
}
