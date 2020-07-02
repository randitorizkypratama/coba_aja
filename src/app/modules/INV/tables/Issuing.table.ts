export const tableHeaders = [
  {
    label: 'Date',
    field: 'date',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Storage',
    field: 'storage',
    name: 'lscheinnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Document Number',
    field: 'number',
    name: 'f-bezeich',
    sortable: false,
  },
  {
    label: 'Articel',
    field: 'articel',
    name: 'deptName',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Article',
    field: 'artnr',
    name: 'artnr',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'description',
    name: 'bezeich',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Outgoing Quantity',
    field: 'qty',
    name: 'einheit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Average Price',
    field: 'price',
    name: 'content',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Amount',
    field: 'amount',
    name: 'einzelpreis',
    sortable: false,
  },
  {
    label: 'ID',
    field: 'id',
    name: 'qty',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const dataDummy = [];

let i = 0;

for (i; i < 100; i++) {
  console.log('sukses');
  dataDummy.push({
    date: '20/20/2100',
    storage: 'tas',
    number: 12223,
    articel: 'jangan lupa disimpan',
    description: 'deskripsi',
    qty: 10000,
    price: 100.0,
    amount: 'mdj',
    id: 123,
  });
}
