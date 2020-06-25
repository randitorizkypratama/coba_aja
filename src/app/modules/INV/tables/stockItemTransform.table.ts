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
        label: 'From Storage',
        field: 'f-bezeich',
        name: 'f-bezeich',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Article',
        field: 'artnr',
        name: 'artnr',
        align: 'left',
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
        align: 'left',
        sortable: false,
    },
    {
        label: 'Average',
        field: 'price',
        name: 'price',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 's-qty',
        name: 's-qty',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Amount',
        field: 'val',
        name: 'val',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Document Number',
        field: 'lscheinnr',
        name: 'lscheinnr',
        align: 'right',
        sortable: false,
    },
];

