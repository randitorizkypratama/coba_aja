import { TableHeader } from '~/components/VhpUI/typings';
export const tableHeaders: TableHeader[] = [
  {
    label: 'Date',
    field: 'datum',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Delivery Number',
    field: 'lscheinnr',
    name: 'lscheinnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'From Storage',
    field: 'f-bezeich',
    name: 'f-bezeich',
    sortable: false,
  },
  {
    label: 'To Storage',
    field: 'deptName',
    name: 'deptName',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Articel',
    field: 'artnr',
    name: 'artnr',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Unit',
    field: 'einheit',
    name: 'einheit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Content',
    field: 'content',
    name: 'content',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Average Price',
    field: 'einzelpreis',
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
    label: 'Outgoing Quantity',
    field: 'qty1',
    name: 'qty1',
    sortable: false,
  },
  {
    label: 'Account Number',
    field: 'stornogrund',
    name: 'stornogrund',
    sortable: false,
  },
  {
    label: 'ID',
    field: 'ID',
    name: 'ID',
    sortable: false,
  },
  {
    label: 'Approved',
    field: 'invoice-nr',
    name: 'invoice-nr',
    sortable: false,
  },
  { name: 'actions', field: 'actions' },
];

export const tableDialogNew: TableHeader[] = [
  {
    label: 'Storage Number',
    field: 'storageNumber',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Articel Number',
    field: 'articelNumber',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'sBezeich',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Unit Price',
    field: 'unitPrice',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Onhand',
    field: 'onhand',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'quantity',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Amount',
    field: 'amount',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Date',
    field: 'date',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Type Of Moving',
    field: 'type',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Created By',
    field: 'sUsername',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Mess Unit',
    field: 'datum',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Time',
    field: 'time',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Account Number',
    field: 'acctNo',
    name: 'datum',
    align: 'left',
    sortable: false,
  },
];

export const tableDialogStockArticel: TableHeader[] = [
  {
    label: 'Articel Number',
    field: 'artnr',
    name: 'artnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Onhand',
    field: 'onhand',
    name: 'onhand',
    align: 'left',
    sortable: false,
  },
]
export const tableCostCenterList: TableHeader[] = [
  {
    label: 'Cost Center List',
    field: 'name',
    name: 'artnr',
    align: 'left',
    sortable: false,
  }
]
export const tableAllocationsList: TableHeader[] = [
  {
    label: 'Account Number',
    field: 'fibu',
    name: 'artnr',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'artnr',
    align: 'left',
    sortable: false,
  }
]