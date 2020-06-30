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

export const modalAdd: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'right',
    sortable: true,
  },
  {
    label: 'R-Unit',
    field: 's-unit',
    name: 's-unit',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Net-Quantity',
    field: 'menge',
    name: 'menge',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Cost',
    field: 'cost',
    name: 'cost',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Unit',
    field: 'masseinheit',
    name: 'masseinheit',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Content',
    field: 'inhalt',
    name: 'inhalt',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Avg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Loss Factor(%)',
    field: 'lostfact',
    name: 'lostfact',
    align: 'right',
    sortable: true,
  },
  { name: 'actions', field: 'actions' },
];

export const stockArticle: TableHeader[] = [
  {
    label: 'Artcle Number',
    field: 'artnr',
    name: 'artnr',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Unit',
    field: 'masseinheit',
    name: 'masseinheit',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Content',
    field: 'inhalt',
    name: 'inhalt',
    align: 'right',
    sortable: true,
  },
  {
    label: 'R-Unit',
    field: 'herkunft',
    name: 'herkunft',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Avrg Price',
    field: 'vk-preis',
    name: 'vk-preis',
    align: 'right',
    sortable: true,
  },
];

export const Recipe: TableHeader[] = [
  {
    label: 'No',
    field: 'artnrrezept',
    name: 'artnrrezept',
    align: 'right',
    sortable: true,
  },
  {
    label: 'Description',
    field: 'bezeich',
    name: 'bezeich',
    align: 'right',
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
    label: 'Category',
    field: '',
    name: '',
    align: 'right',
    sortable: true,
  },
  {
    name: 'actions',
    field: 'actions',
  },
];
