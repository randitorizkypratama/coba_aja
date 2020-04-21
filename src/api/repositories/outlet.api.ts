import { DoRequest } from '../config/repository';

const GL_URL = 'vhpGL';

export interface OutletEndpoints {
  getChartOfAccount: any;
  getGLMainAccount: any;
  getGLFSType: any;
  getGLDeptAccount: any;
  getViewBudgetValue: any;
  getViewActualValue: any;
}

const defaultBodies = {
  chart: {
    fibukonto: 0,
    fromDepart: 0,
    fromFstype: 0,
    fromMain: 0,
  },
  main: {
    caseType: 4,
    char1: '',
    char2: '',
    int1: 0,
    int2: 0,
  },
  fsType: {
    caseType: 2,
    char1: '',
    char2: '',
    int1: 0,
  },
};

export default (doFetch: DoRequest): OutletEndpoints => ({
  getChartOfAccount: (body = defaultBodies.chart) =>
    doFetch({ url: `${GL_URL}/getChartOfAccount`, body }).then(
      ([, res]) => res?.b1List?.['b1-list']
    ),
  getGLMainAccount: (body = defaultBodies.main) =>
    doFetch({ url: `${GL_URL}/getGLMainAccount`, body }).then(
      ([, res]) => res?.tGlMain?.['t-gl-main']
    ),
  getGLFSType: (body = defaultBodies.fsType) =>
    doFetch({ url: `${GL_URL}/getGLFSType`, body }).then(
      ([, res]) => res?.tGlFstype?.['t-gl-fstype']
    ),
  getGLDeptAccount: () =>
    doFetch({ url: `${GL_URL}/getGLDeptAccount` }).then(
      ([, res]) => res?.tGlDepartment?.['t-gl-department']
    ),
  getViewBudgetValue: (fibukonto: string) =>
    doFetch({ url: `${GL_URL}/getViewBudgetValue`, body: { fibukonto } }),
  getViewActualValue: (fibukonto: string) =>
    doFetch({ url: `${GL_URL}/getViewActualValue`, body: { fibukonto } }).then(
      ([, res]) => res?.bList?.['b-list']
    ),
});
