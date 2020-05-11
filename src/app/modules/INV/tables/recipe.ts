import { TableHeader } from '~/components/VhpUI/typings';

export const tableHeaders: TableHeader[] = [
  {
    label: 'Recipe Number',
    field: 'artnr',
    name: 'artnr',
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
    field: 'masseinheit',
    name: 'masseinheit',
    sortable: true,
  },
  {
    label: 'Portion',
    field: 'inhalt',
    name: 'inhalt',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Category Name',
    field: 'traubensorte',
    name: 'traubensorte',
    sortable: true,
  },
  {
    label: 'Created',
    field: 'lief-einheit',
    name: 'lief-einheit',
    sortable: true,
  },
  {
    label: 'Last Changed',
    field: 'min-bestand',
    name: 'min-bestand',
    sortable: true,
  },
  {
    label: 'Recipe Cost',
    field: 'ek-aktuell',
    name: 'ek-aktuell',
    sortable: true,
  },
  {
    label: 'Cost Portion',
    field: 'ek-letzter',
    name: 'ek-letzter',
    sortable: true,
  },
  { name: 'actions', field: 'actions' },
];
