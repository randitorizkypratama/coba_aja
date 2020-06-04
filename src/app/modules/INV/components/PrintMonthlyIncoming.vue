<template>
  <div id="app">
    <STable
    dense
    :columns="tableHeaders"
    :data="data"
    separator="cell"
    :rows-per-page-options="[0]"
    :pagination.sync="pagination"
    hide-bottom
    table-class="scroll overflow-hidden"
    id="printMe"
    ></STable>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
  onBeforeMount,
} from '@vue/composition-api';
import { tableHeaders } from '../tables/monthlyIncoming.table';
import { date } from 'quasar';
import print from 'print-js';

export default defineComponent({
  setup(_, { root: {  } }) {

    const state = reactive({
      isFetching: true,
      data: [],
    });

    onBeforeMount( () => {
      const printData = JSON.parse(localStorage.getItem('printData')!);
      state.data = printData;
      state.isFetching = false;
      localStorage.removeItem('printData');
    });

    onMounted( () => {
      print({
        printable: 'printMe',
        type: 'html',
        targetStyles: ['*'],
        maxWidth: 1024,
        //style: '',
        //header: '<center><h3 class="custom-h3">Monthly Incoming</h3></center>',
      })
    });

    return {
      ...toRefs(state),
      tableHeaders,
      pagination: {
        page: 1,  
        rowsPerPage: 0,
      },
    };
  },
});
</script>
