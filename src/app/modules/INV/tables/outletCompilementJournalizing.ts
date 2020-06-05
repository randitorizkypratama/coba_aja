import { TableHeader } from '~/components/VhpUI/typings';

export const tableHeaders: TableHeader[] = [
  {
    label: 'Account Number',
    field: 'fibukonto',
    name: 'fibukonto',
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
    label: 'Debit',
    field: 'debit',
    name: 'debit',
    sortable: false,
  },
  {
    label: 'Credit',
    field: 'credit',
    name: 'credit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Remark',
    field: 'bemerk',
    name: 'bemerk',
    align: 'right',
    sortable: false,
  },
  {
    label: 'User ID',
    field: 'userinit',
    name: 'userinit',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Post Date',
    field: 'sysdate',
    name: 'sysdate',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Time',
    field: 'amount',
    name: 'amount',
    align: 'right',
    sortable: false,
  },
  {
    label: 'Chg-ID',
    field: 'fibukonto',
    name: 'fibukonto',
    sortable: false,
  },
  {
    label: 'Change Date',
    field: 'cost-center',
    name: 'cost-center',
    sortable: false,
  },
];
