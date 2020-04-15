/** @format */

export const tableItem = [
  {
    text: "Article Number",
    align: "start",
    value: "artnr",
  },
  { text: "Description", value: "bezeich" },
  { text: "Unit", value: "masseinheit" },
  { text: "Content", value: "inhalt" },
  { text: "Unit", value: "traubensorte" },
  { text: "Content", value: "lief-einheit" },
  { text: "Minumum Stock (Mess)", value: "min-bestand" },
  { text: "Actual", value: "ek-aktuell" },
  { text: "Last", value: "ek-letzter" },
  { text: "Average", value: "vk-preis" },
  { text: "Purchase Frequency", value: "fibukonto" },
  { text: "Actions", value: "actions", sortable: false },
];

export const tableModal = [
  {
    text: "No",
    align: "start",
    value: "artnrrezept",
  },
  {
    text: "Description",
    value: "bezeich",
  },
  {
    text: "Category",
    value: "kategorie",
  },
];

export const tableAccountNumber = [
  {
    text: "L.AcctNo",
    align: "start",
    value: "fibukonto",
  },
  {
    text: "L.Desc",
    value: "bezeich",
  },
  {
    text: "L.type",
    value: "acc-type",
  },
  {
    text: "L.Dept",
    value: "deptnr",
  },
  {
    text: "L.main",
    value: "main-nr",
  },
];

export default { tableItem, tableModal };
