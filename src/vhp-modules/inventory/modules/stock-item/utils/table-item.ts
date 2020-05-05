/** @format */

// /** @format */

// import Vue from "vue";
// import { tableItem } from "../header/header-table-item";
// import useFetchData from "@/../utils/api/useFetchData";
// export default Vue.extend({
//   name: "FocTablesFocRooms",
//   data: () => ({
//     headers: [],
//     dataHotel: [],
//     dataFilter: [],
//     editedIndex: -1,
//     dataArticle: "",
//     radioButton: ""
//   }),
//   computed: {
//     formTitle() {
//       return this.editedIndex === -1 ? "New Item" : "Edit Item";
//     }
//   },
//   created() {
//     const header = tableItem;
//     for (const i in header) {
//       this.$data.headers.push(header[i]);
//     }
//   },
//   methods: {
//     getData(data: any, arrtcNumber: any, radioButton: any) {
//       this.$data.radioButton = radioButton;
//       this.dataArticle = data;
//       const dataTable = data.response.tLArtikel["t-l-artikel"];
//       const hasilFilter = dataTable.filter((hasil: any) => {
//         return hasil.artnr.toString().includes(arrtcNumber.toString());
//       });
//       this.$data.dataHotel = arrtcNumber == "" ? dataTable : hasilFilter;
//     },
//     options() {
//       useFetchData("getInvArticleList", {
//         sorttype: this.$data.radioButton,
//         lastArt: this.$data.dataArticle.response.firstArtnr,
//         lastArt1: this.$data.dataArticle.response.currArt1
//       }).then((res: any) => {
//         this.$data.dataArticle = res;
//         const dataArtikel = res.response.tLArtikel["t-l-artikel"];
//         for (const i in dataArtikel) {
//           this.$data.dataHotel.push(dataArtikel[i]);
//         }
//       });
//     }
//   }
// });
