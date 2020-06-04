<template>
  <div id="app">
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
import { date } from 'quasar';
import print from 'print-js';

export default defineComponent({
  setup(_, { root: { $api } }) {

    const state = reactive({
      isFetching: true,
      data: [],
    });

    onBeforeMount( () => {
      const licenseNr = localStorage.getItem("licenseNr");
	  const lstName = localStorage.getItem("lstName");
      const printRequest = JSON.parse(localStorage.getItem('printRequest')!);
	  localStorage.removeItem("licenseNr");
	  localStorage.removeItem("lstName");
      localStorage.removeItem("printRequest");
        
	  if (licenseNr == undefined || lstName == undefined || printRequest == undefined) {

		//Change: Use multilanguange function and error handling
		alert("Please press the button print from the report");
		window.close();
	  }
    });

    onMounted( async () => {
      const res = await $api.printLNL.doPrintLNL({
        "licenseNr": "2216",
        "lstName": "print-rc-lnl",
        "printCase":"RC",
        "variableList": {
            "variable-list": [
				{
                    "varKey": "$GASTNO",
                    "varValue": "110393"
                },
                {
                    "varKey": "$CR-USR",
                    "varValue": "293"
                },
                {
                    "varKey": "$FIRSTNAME",
                    "varValue": ""
                },
                {
                    "varKey": "$TITLE1",
                    "varValue": ""
                },
                {
                    "varKey": "$ROOM",
                    "varValue": "SUP / 1"
                },
                {
                    "varKey": "$ROOM-NO",
                    "varValue": ""
                },
                {
                    "varKey": "$ROOM-PRICE",
                    "varValue": "0"
                },
                {
                    "varKey": "$ARRIVAL",
                    "varValue": "11/01/2020"
                },
                {
                    "varKey": "$ETAFL",
                    "varValue": "      "
                },
                {
                    "varKey": "$ETATIME",
                    "varValue": "00:00"
                },
                {
                    "varKey": "$DEPARTURE",
                    "varValue": "13/01/2020 13:00"
                },
                {
                    "varKey": "$DEPARTURE0",
                    "varValue": "13/01/2020"
                },
                {
                    "varKey": "$ETDFL",
                    "varValue": "      "
                },
                {
                    "varKey": "$ETDTIME",
                    "varValue": "00:00"
                },
                {
                    "varKey": "$ACC",
                    "varValue": "2"
                },
                {
                    "varKey": "$ADDRESS1",
                    "varValue": ""
                },
                {
                    "varKey": "$ADDRESS2",
                    "varValue": ""
                },
                {
                    "varKey": "$ADDRESS3",
                    "varValue": ""
                },
                {
                    "varKey": "$RESIDENT",
                    "varValue": ""
                },
                {
                    "varKey": "$ZIP",
                    "varValue": ""
                },
                {
                    "varKey": "$COUNTRY",
                    "varValue": "INA"
                },
                {
                    "varKey": "$GCOMPANY",
                    "varValue": "TIKET.COM,                                        "
                },
                {
                    "varKey": "$RSV-ADDR1",
                    "varValue": "Jl. Kawi NO.45"
                },
                {
                    "varKey": "$RSV-ADDR2",
                    "varValue": "RT 006/002 Setiabudhi Jakarta"
                },
                {
                    "varKey": "$RSV-ADDR3",
                    "varValue": ""
                },
                {
                    "varKey": "$RSV-CITY",
                    "varValue": "Jakarta Selatan"
                },
                {
                    "varKey": "$RSV-ZIP",
                    "varValue": "12980"
                },
                {
                    "varKey": "$RSV-COUNTRY",
                    "varValue": "INA"
                },
                {
                    "varKey": "$CCARD",
                    "varValue": ""
                },
                {
                    "varKey": "$BIRTHPLACE",
                    "varValue": "                        "
                },
                {
                    "varKey": "$BIRTHDATE",
                    "varValue": ""
                },
                {
                    "varKey": "$ID-No",
                    "varValue": ""
                },
                {
                    "varKey": "$ID-EXPIRED",
                    "varValue": ""
                },
                {
                    "varKey": "$NATION1",
                    "varValue": "INA"
                },
                {
                    "varKey": "$PURPOSE",
                    "varValue": ""
                },
                {
                    "varKey": "$BL-INSTRUCT",
                    "varValue": ""
                },
                {
                    "varKey": "$EMAIL",
                    "varValue": ""
                },
                {
                    "varKey": "$RESNO",
                    "varValue": "81814"
                },
                {
                    "varKey": "$PROVINCE",
                    "varValue": ""
                },
                {
                    "varKey": "$PHONE",
                    "varValue": ""
                },
                {
                    "varKey": "$OCCUPATION",
                    "varValue": ""
                },
                {
                    "varKey": "$CHILD1",
                    "varValue": "0"
                },
                {
                    "varKey": "$CHILD2",
                    "varValue": "0"
                },
                {
                    "varKey": "$MAIN-COMMENT",
                    "varValue": "REQ 01 SUPT \nTA 373.320 N RB \nBID: 5585770 VCH RCVD \nDS "
                },
                {
                    "varKey": "$MEMBER-COMMENT",
                    "varValue": ""
                },
                {
                    "varKey": "$DEPOSITGEF",
                    "varValue": "0"
                },
                {
                    "varKey": "$DEPOSITBEZ",
                    "varValue": "0"
                },
                {
                    "varKey": "$SEGMENT",
                    "varValue": "FIT - INTERNET"
                },
                {
                    "varKey": "$Name1",
                    "varValue": "EDWIN PRASETYO NUGROHO"
                },
                {
                    "varKey": "$TELEFAX",
                    "varValue": ""
                },
                {
                    "varKey": "$MOBILE",
                    "varValue": "                "
                },
                {
                    "varKey": "$SOURCE",
                    "varValue": "E-MAIL"
                }
            ]
        },
        "titleList": {
            "title-list": [
                {
                    "titleNr":"",
                    "titleStr": ""
                }
            ]
        },
        "dataList": {
            "data-list": [
                {
                    "dataStr": ""
                }
            ]
        }
      });

      print({
        printable: res.printData,
        type: 'pdf',
        base64: true,
        //maxWidth: 1024,
        //style: '',
        //header: '<center><h3 class="custom-h3">Monthly Incoming</h3></center>',
      })
    });

    return {
      ...toRefs(state),
    };
  },
});
</script>
