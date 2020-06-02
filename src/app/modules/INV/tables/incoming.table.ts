import { TableHeader } from '~/components/VhpUI/typings';

export const tableHeaders: TableHeader[] = [
    {
        label: 'Date',
        field: 'DATE',
        sortable: false,
    },
    {
        label: 'Storage Number',
        field: 'st',
        sortable: false,
    },
    {
        label: 'Supplier',
        field: 'supplier',
    },
    {
        label: 'Article Number',
        field: 'artnr',
        sortable: false,
    },
    {
        label: 'Description',
        field: 'DESCRIPTION',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Delivery Unit',
        field: 'd-unit',
        sortable: false,
    },
    {
        label: 'Price',
        field: 'price',
        sortable: false,
    },
    {
        label: 'Incoming Quantity',
        field: 'inc-qty',
        sortable: false,
    },
    {
        label: 'Amount',
        field: 'amount',
        sortable: false,

    },
    {
        label: 'Document Number',
        field: 'docu-no',
        sortable: false,

    },
    {
        label: 'ID',
        field: 'ID',
        sortable: false,

    },
    {
        label: 'Delivery Note',
        field: 'deliv-note',
        sortable: false,
    },
    {
        label: 'Invoice Number',
        field: 'invoice-nr',
        sortable: false,
    },
];
