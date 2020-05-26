<template>
  <div class="fixed-center text-center">
    <!--<q-table
      dense
      :loading="isFetching"
      title="Accounting Parameter"
      :columns="tableHeaders"
      :data="datas"
      separator="cell"
      :rows-per-page-options="[0]" 
      :pagination.sync="pagination"
      hide-bottom
    >-->
      <!--<template #header-cell-fibukonto="props">
        <q-th :props="props" class="fixed-col left">
          {{ props.col.label }}
        </q-th>
      </template>

      <template #body-cell-fibukonto="props">
        <q-td :props="props" class="fixed-col left">
          {{ props.row.fibukonto }}
        </q-td>
      </template>

      <template #header-cell-actions="props">
        <q-th :props="props" class="fixed-col right">
          {{ props.col.label }}
        </q-th>
      </template>

      <template #body-cell-actions="props">
        <q-td :props="props" class="fixed-col right">
          <q-icon name="more_vert" size="16px">
            <q-menu auto-close anchor="bottom right" self="top right">
              <q-list>
                <q-item
                  clickable
                  v-ripple
                  @click="selectAccount(props.row.fibukonto)"
                >
                  <q-item-section>Show Account Budget</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </q-td>
      </template>-->
    <!--</q-table>-->
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  toRefs,
  reactive,
} from '@vue/composition-api';
import b64ToBlob from '~/app/helpers/b64ToBlob.helpers';
import print from 'print-js';

export default defineComponent({
  setup(_, { root: { $api } }) {

    const state = reactive({
      isFetching: true,
      datas: [],
    });

    onMounted(async () => {
      const res = await $api.printLNL.doPrintLNL({
        "licenseNr": "2216",
        "lstName": "sorder-list",
        "variableList": {
            "variable-list": [
                {
                    "varKey": "$TI",
                    "varValue": "STOCK ARTICLES ORDERED LIST"
                },
                {
                    "varKey": "$Pr",
                    "varValue": "Period : 03/01/2020 to 30/03/2020"
                }
            ]
        },
        "titleList": {
            "title-list": [
                {
                    "titleNr": 1,
                    "titleStr": "DATE"
                },
                {
                    "titleNr": 2,
                    "titleStr": "DOCUMENT NO"
                },
                {
                    "titleNr": 3,
                    "titleStr": "ARTICLE"
                },
                {
                    "titleNr": 4,
                    "titleStr": "DESCRIPTION"
                },
                {
                    "titleNr": 5,
                    "titleStr": "ORDER QTY"
                },
                {
                    "titleNr": 6,
                    "titleStr": "UNIT PRICE"
                },
                {
                    "titleNr": 7,
                    "titleStr": "AMOUNT"
                },
                {
                    "titleNr": 8,
                    "titleStr": "DELIVERED"
                },
                {
                    "titleNr": 9,
                    "titleStr": "S-UNIT"
                },
                {
                    "titleNr": 10,
                    "titleStr": "AMOUNT"
                },
                {
                    "titleNr": 11,
                    "titleStr": "DELIVERY DATE"
                },
                {
                    "titleNr": 12,
                    "titleStr": "SUPPLIER"
                }
            ]
        },
        "dataList": {
            "data-list": [
                {
                    "dataStr": "03/01/20\u0002P200103006\u00021103050\u0002FT - Banana Ambon Premium Quality *** star\u00023.00\u000223,000.00\u000269,000.00\u00023.00\u00020\u000269,000.000\u000203/01/20\u0002SUMBER REZEKI JAKARTA UTARA"
                },
                {
                    "dataStr": "03/01/20\u0002P200103006\u00021103050\u0002FT - Banana Ambon Premium Quality *** star\u00023.00\u000223,000.00\u000269,000.00\u00023.00\u00020\u000269,000.000\u000203/01/20\u0002SUMBER REZEKI JAKARTA UTARA"
                }
            ]
        }
      });
      print({
        printable: res.printData,
        type: 'pdf',
        base64: true
      })

      /*const blob = b64ToBlob(res.printData, 'application/pdf');
      const blobUrl = URL.createObjectURL(blob);
      window.open(blobUrl, '_self');
      window.focus();
      window.print();*/
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
<style lang="scss" scoped>
</style>
