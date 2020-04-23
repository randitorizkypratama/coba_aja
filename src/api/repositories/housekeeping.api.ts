import { DoRequest } from '../config/repository';

const HK_URL = 'HouseKeeping';

export interface HousekeepingEndpoints {
  getOverview: any;
}

export default (doFetch: DoRequest): HousekeepingEndpoints => ({
  getOverview: () => doFetch({ url: `${HK_URL}/getOverview` }),
});
