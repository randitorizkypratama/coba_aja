<template>
  <div>
    <q-drawer :value="true" side="left" bordered :width="250" persistent>
      <section class="mt-7">
        <div class="q-pa-md">
          General Parameter Setup
        </div>
      </section>
    </q-drawer>

    <div class="q-pa-lg">
      <div class="q-mb-md">
        <q-btn flat round class="q-mr-lg">
          <img :src="require('~/app/icons/Icon-Refresh.svg')" height="30" />
        </q-btn>
        <q-btn @click="doPrint" flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" />
        <!--<q-btn flat round>
          <img :src="require('~/app/icons/Icon-Print.svg')" height="30" v-print="printOptions" />-->
        </q-btn>
      </div>

      <STable
        :loading="isFetching"
        :columns="tableHeaders"
        :data="tableData"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        hide-bottom
        class="table-accounting-date"
        id="printMe"
      >
      <!--<STable
        :loading="isFetching"
        :columns="tableHeaders"
        :data="tableData"
        :rows-per-page-options="[0]"
        :pagination.sync="pagination"
        hide-bottom
        class="table-accounting-date"
      >-->
        <template #header="props">
          <q-tr>
            <q-th colspan="6">Accounting Parameter Date</q-th>
          </q-tr>

          <q-tr>
            <q-th
              v-for="th in groupHeaders(props.cols)"
              :key="th.name"
              :props="props"
              :class="th.name"
            >
              {{ th.label }}
            </q-th>
            <q-th key="actions" class="d-none" />
          </q-tr>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props" class="fixed-col right d-none">
            <q-icon
              v-if="
                [1003, 1014, 269, 1035, 1123, 1118].includes(props.row.paramnr)
              "
              name="more_vert"
              size="16px"
            >
              <q-menu auto-close anchor="bottom right" self="top right">
                <q-list>
                  <q-item clickable v-ripple @click="onEdit(props.row)">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-icon>
          </q-td>
        </template>
      </STable>

      <DialogAccountingDateParameter
        :dialog="dialog"
        :selected-param="selectedParam"
        @onDialog="onDialog"
        @onUpdate="onUpdate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
} from '@vue/composition-api';
import {
  tableHeaders,
  tableColumns,
} from './tables/accountingDateParameter.table';
import { date } from 'quasar';
//import print from 'print-js';
import { getHtlName, getHtlAdr, getHtlTel } from '~/app/helpers/getCredentials.helpers';
//import print from 'vue-print-nb';
import { addLnLVariable, printLnL} from '~/app/helpers/printLnL.helpers';
export default defineComponent({
  /*directives: {
    print,
  },*/
  setup(_, { root: { $api, $store } }) {
    const state = reactive<any>({
      isFetching: true,
      dialog: false,
      selectedParam: null,
      tableData: [],
      /*printOptions: {
        id: 'printMe',
        extraCss: 'https://dev-bodowa.s3-ap-southeast-1.amazonaws.com/Cincin/test.css',
      },*/
    });

    onMounted(async () => {
      const res = await $api.generalLedger.getGLHtparam();
      state.tableData = tableColumns(res);
      state.isFetching = false;
    });

    const onDialog = (val) => {
      state.dialog = val;
    };

    const onEdit = (param) => {
      state.selectedParam = param;
      onDialog(true);
    };

    const onUpdate = (paramnr, paramInput) => {
      const dataIdx = state.tableData.findIndex(
        (data) => data.paramnr === paramnr
      );
      state.tableData[dataIdx].values = paramInput;
      onDialog(false);
    };

    const today = Date.now()
    const formattedToday = date.formatDate(today, 'DD/MM/YYYY')
    const rawHeader = `
        <table style=width:100%>
        <tr>
        <td align=left>` + getHtlName + `</td>
        <td align=right>Date: ` + formattedToday + `</td>
        </tr>
        <tr>
        <td align=left>` + getHtlAdr + `</td>
        </tr>
        <tr>
        <td align=left>Tel ` + getHtlTel + `</td>
        </tr>
        </table>
        <center><h3 class="custom-h3">Accounting Parameter</h3></center>
    `

    const styleShit = `
      d-none {
          display: none
      }

      table {
        border-collapse: collapse;
      }

      table, th, td {
        border: 1px solid black;
      }
    `

    function doPrint() {
      const variableList = {};
      addLnLVariable(variableList,"GASTNO","110393");
      addLnLVariable(variableList,"CR-USR","293");
      addLnLVariable(variableList,"FIRSTNAME","TEST FIRSTNAME");
      addLnLVariable(variableList,"TITLE1","TEST TITLE");
      addLnLVariable(variableList,"ROOM","SUP / 1");
      addLnLVariable(variableList,"ROOM-NO","TEST ROOM NR");
      addLnLVariable(variableList,"ROOM-PRICE","0");
      addLnLVariable(variableList,"ARRIVAL","11/01/2020");
      addLnLVariable(variableList,"ETAFL","TEST ETA");
      addLnLVariable(variableList,"ETATIME","00:00");
      addLnLVariable(variableList,"DEPARTURE","13/01/2020 13:00");
      addLnLVariable(variableList,"DEPARTURE0","13/01/2020");
      addLnLVariable(variableList,"ETDFL","TEST ETD");
      addLnLVariable(variableList,"ETDTIME","00:00");
      addLnLVariable(variableList,"ACC","2");
      addLnLVariable(variableList,"ADDRESS1","Add1");
      addLnLVariable(variableList,"ADDRESS2","Add2");
      addLnLVariable(variableList,"ADDRESS3","Add3");
      addLnLVariable(variableList,"RESIDENT","TEST RESIDENT");
      addLnLVariable(variableList,"ZIP","TEST ZIP");
      addLnLVariable(variableList,"COUNTRY","INA");
      addLnLVariable(variableList,"GCOMPANY","TIKET.COM");
      addLnLVariable(variableList,"RSV-ADDR1","Jl. Kawi NO.45");
      addLnLVariable(variableList,"RSV-ADDR2","RT 006/002 Setiabudhi Jakarta");
      addLnLVariable(variableList,"RSV-ADDR3","");
      addLnLVariable(variableList,"RSV-CITY","Jakarta Selatan");
      addLnLVariable(variableList,"RSV-ZIP","12980");
      addLnLVariable(variableList,"RSV-COUNTRY","INA");
      addLnLVariable(variableList,"CCARD","");
      addLnLVariable(variableList,"BIRTHPLACE","Test BIRTHPLACE");
      addLnLVariable(variableList,"BIRTHDATE","");
      addLnLVariable(variableList,"ID-No","TEST ID");
      addLnLVariable(variableList,"ID-EXPIRED","01/01/01");
      addLnLVariable(variableList,"NATION1","INA");
      addLnLVariable(variableList,"PURPOSE","TEST PURPOSE");
      addLnLVariable(variableList,"BL-INSTRUCT","TEST BILL INSTRUCTION");
      addLnLVariable(variableList,"EMAIL","TEST EMAIL");
      addLnLVariable(variableList,"RESNO","81814");
      addLnLVariable(variableList,"PROVINCE","TEST PROVINCE");
      addLnLVariable(variableList,"PHONE","TEST PHONE");
      addLnLVariable(variableList,"OCCUPATION","TEST OCCUPATION");
      addLnLVariable(variableList,"CHILD1","0");
      addLnLVariable(variableList,"CHILD2","0");
      addLnLVariable(variableList,"MAIN-COMMENT","REQ 01 SUPT \nTA 373.320 N RB \nBID: 5585770 VCH RCVD \nDS ");
      addLnLVariable(variableList,"MEMBER-COMMENT","TEST MEMBER COMMENT\nTEST");
      addLnLVariable(variableList,"DEPOSITGEF","0");
      addLnLVariable(variableList,"DEPOSITBEZ","0");
      addLnLVariable(variableList,"SEGMENT","FIT - INTERNET");
      addLnLVariable(variableList,"Name1","EDWIN PRASETYO NUGROHO");
      addLnLVariable(variableList,"TELEFAX","TEST TELEFAX");
      addLnLVariable(variableList,"MOBILE","TEST MOBILE");
      addLnLVariable(variableList,"SOURCE","E-MAIL");

      printLnL("2216","print-rc-lnl","RC",variableList,[],[]);
      /*print({
        //printable: state.tableData,
        //type: 'json',
        printable: 'printMe',
        type: 'html',
        properties: [
          { field: 'paramnr', displayName: 'Number'},
          { field: 'bezeichnung', displayName: 'Name'},
          { field: 'values', displayName: 'Value'},
          { field: 'lupdate', displayName: 'Changed Date'},
          { field: 'fdefault', displayName: 'Changed By'},
        ],
        //style: styleShit,
        header: '<center><h3 class="custom-h3">Accounting Parameter</h3></center>',
        style: '.custom-h3 { color: black; }',
        showModal: true,
        modalMessage: 'Loading...',
      })
      //window.open('/gl/param-print', '_blank');
      //localStorage.setItem('printData',JSON.stringify(state.tableData));*/
    }

    const groupHeaders = (cols) => cols.filter((col) => col.name !== 'actions');
    const actionHeader = (cols) => cols.find((col) => col.name === 'actions');

    return {
      ...toRefs(state),
      tableHeaders,
      onEdit,
      onDialog,
      onUpdate,
      groupHeaders,
      actionHeader,
      pagination: { page: 1, rowsPerPage: 0 },
      doPrint,
    };
  },
  components: {
    SearchPosting: () => import('./components/SearchPosting.vue'),
    DialogAccountingDateParameter: () =>
      import('./components/DialogAccountingDateParameter.vue'),
  },
});
</script>

<style lang="scss" scoped>
::v-deep .table-accounting-date {
  max-height: 75vh;

  thead tr {
    th {
      position: sticky;
      z-index: 3;
    }

    &:first-child th {
      top: 0;
    }

    &:last-child th {
      top: 27px;
    }
  }
}
</style>
