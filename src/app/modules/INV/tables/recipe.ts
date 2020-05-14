import { TableHeader } from '~/components/VhpUI/typings';

export const tableHeaders: TableHeader[] = [
  {
    label: 'Recipe Number',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Category',
    field: 'kategorie',
    name: 'kategorie',
    sortable: true,
  },
  {
    label: 'Portion',
    field: 'portion',
    name: 'portion',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Category Name',
    field: 'bezeich',
    name: 'bezeich',
    sortable: true,
  },
  {
    label: 'Created',
    field: 'datumanlage',
    name: 'datumanlage',
    sortable: true,
  },
  {
    label: 'Last Changed',
    field: 'datummod',
    name: 'datummod',
    sortable: true,
  },
  {
    label: 'Recipe Cost',
    field: 'cost',
    name: 'cost',
    sortable: true,
  },
  {
    label: 'Cost Portion',
    field: 'cost',
    name: 'cost',
    sortable: true,
  },
  { name: 'actions', field: 'actions' },
];
