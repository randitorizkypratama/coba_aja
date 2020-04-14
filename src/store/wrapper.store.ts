import { computed } from '@vue/composition-api';

interface UseModule {
  useState: any;
  useMutations: any;
  useActions: any;
  useGetters: any;
}

export const generateModule = (store: any, namespace: string): UseModule => {
  const mapProps = (props: Array<string>, cb: Function) =>
    props.reduce((result, prop) => {
      result[prop] = cb(prop);
      return result;
    }, {});

  const computedState = (prop: string) =>
    computed(() => store.state[namespace][prop]);

  const callMutation = (prop: string) => (payload: any) => {
    store.commit(`${namespace}/${prop}`, payload);
  };

  const callAction = (prop: string) => (payload: any) =>
    store.dispatch(`${namespace}/${prop}`, payload);

  const computedGetter = (prop: string) =>
    computed(() => store.getters[`${namespace}/${prop}`]);

  return {
    useState: (props: Array<string>) => mapProps(props, computedState),
    useMutations: (props: Array<string>) => mapProps(props, callMutation),
    useActions: (props: Array<string>) => mapProps(props, callAction),
    useGetters: (props: Array<string>) => mapProps(props, computedGetter),
  };
};
