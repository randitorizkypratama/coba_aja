import { TableHeader } from '~/components/VhpUI/typings';
import { formatThousands } from '~/app/helpers/numberFormat.helpers';

const replaceTotal = (string: string) => {
  if (string === 'TOTAL') return 'Subtotal'
  else if (string === 'GRAND TOTAL') return 'Total'
  else return string;
};

export const tableHeaders: TableHeader[] = [
  {
    label: 'Storage',
    field: 'f-bezeich',
    name: 'f-bezeich',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Article Number',
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
    format: (val) => replaceTotal(val),
  },
  {
    label: 'Unit',
    field: 'einheit',
    name: 'einheit',
    align: 'left',
    sortable: false,
  },
  {
    label: 'Quantity',
    field: 'qty',
    name: 'qty',
    align: 'right',
    sortable: false,
    format: (val) => formatThousands(val),
  },
  {
    label: 'Amount',
    field: 'val',
    name: 'val',
    align: 'right',
    sortable: false,
    format: (val) => formatThousands(val),
  },
  {
    label: 'MTD Quantity',
    field: 't-qty',
    name: 't-qty',
    align: 'right',
    sortable: false,
    format: (val) => formatThousands(val),
  },
  {
    label: 'MTD Amount',
    field: 't-val',
    name: 't-val',
    align: 'right',
    sortable: false,
    format: (val) => formatThousands(val),
  },
];
