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
        label: 'Transfer From',
        field: 'dept1',
        name: 'dept1',
        align: 'left',
        sortable: false,
    },
    {
        label: 'Transfer To',
        field: 'dept2',
        name: 'dept2',
        align: 'left',
        sortable: false,
    },
    {
        label: 'From Storage',
        field: '',
        name: '',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Article Number',
        field: 'artnr',
        name: 'artnr',
        align: 'right',
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
        label: 'Food-Cost',
        field: 'f-cost',
        name: 'f-cost',
        align: 'right',
        sortable: false,
    },
    {
        label: 'Beverage-Cost',
        field: 'b-cost',
        name: 'b-cost',
        align: 'right',
        sortable: false,
    },
];

