export const tableHeaders = [
  {
    label: 'St',
    field: 'st',
    name: 'einheit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Articel No',
    field: 'art',
    name: 'content',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'des',
    name: 'einzelpreis',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'qty',
    name: 'qty',
    sortable: false,
  },
  {
    label: 'Unit Price',
    field: 'unit',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Amount',
    field: 'amount',
    name: 'lscheinnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Type of moving',
    field: 'type',
    name: 'f-bezeich',
    sortable: false,
  },
  {
    label: 'Created By',
    field: 'by',
    name: 'deptName',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Date',
    field: 'date',
    name: 'artnr',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Time',
    field: 'time',
    name: 'bezeich',
    align: 'right',
    sortable: false,
  },

  { name: 'actions', field: 'actions' },
];

export const tableHeaders2 = [
  {
    label: 'Description',
    field: 'einheit',
    name: 'einheit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'content',
    name: 'content',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Delivered',
    field: 'einzelpreis',
    name: 'einzelpreis',
    sortable: false,
  },
  {
    label: 'Unit Price',
    field: 'qty',
    name: 'qty',
    sortable: false,
  },
  {
    label: 'Articel No',
    field: 'datum',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Departement',
    field: 'lscheinnr',
    name: 'lscheinnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Suplier',
    field: 'f-bezeich',
    name: 'f-bezeich',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const dataTable = [];

const data = {
  st: 'iphone',
  art: 332708,
  des: 'iphone 11',
  qty: 10,
  unit: 'apple',
  amount: 12.0,
  type: '23XXX',
  by: 'series terbaru',
  date: '12/12/20',
  time: '02:00',
};

for (let i = 0; i < 100; i++) {
  dataTable.push(data);
}
