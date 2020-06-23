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
        align: 'left',
        sortable: false,
    },
    {
        label: 'To Storage',
        field: 't-bezeich',
        name: 't-bezeich',
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
    },
    {
        label: 'Unit',
        field: 'einheit',
        name: 'einheit',
        align: 'left',
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
        field: 'price',
        name: 'price',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Quantity',
        field: 'qty',
        name: 'qty',
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
        label: 'ID',
        field: 'ID',
        name: 'ID',
        align: 'left',
        sortable: false,
    },
];