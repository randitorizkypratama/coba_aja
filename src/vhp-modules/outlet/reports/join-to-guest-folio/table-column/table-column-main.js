export default function mainColumns() {
    const columm = [
        {
            text: "Date",
            value: "datum",
            sortable: false,
            align: "left",
            width: 120,
            divider: true
        },{
            text: "RmNo", 
            value: "rmno",
            sortable: false,
            align: "left",
            width: 120,
            divider: true
        }, {
            text: "Guest Name", 
            value: "gname",
            sortable: false,
            align: "left",
            width: 250,
            divider: true
        }, {
            text: "Bill-No", 
            value: "rechnr",
            sortable: false,
            align: "right",
            width: 120, 
            divider: true
        }, {
            text: "Description", 
            value: "bezeich",
            sortable: false,
            align: "left",
            width: 180,
            divider: true
            },{
            text: "Amount", 
            value: "saldo",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "Foreign-Art", 
            value: "foreign",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        },  {
            text: "Time", 
            value: "zeit",
            sortable: false,
            align: "left",
            width: 100,
            divider: true
        }, {
            text: "ID", 
            value: "id",
            sortable: false,
            align: "left",
            width: 100,
            divider: true
        },  {
            text: "TB", 
            value: "tb",
            sortable: false,
            align: "center",
            width: 100,
            divider: true
        }, {
            text: " ", 
            value: "actions",
            sortable: false
        }
    ];
    return columm;
}