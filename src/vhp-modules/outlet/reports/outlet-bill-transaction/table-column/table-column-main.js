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
            text: "TbNo", 
            value: "tabelno",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
        }, {
            text: "Bill No", 
            value: "billno",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "Art No", 
            value: "artno",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        },{
            text: "Description", 
            value: "descr",
            sortable: false,
            align: "left",
            width: 200, 
            divider: true
        }, {
            text: "Qty", 
            value: "qty",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
            },{
            text: "Sales", 
            value: "sales",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        }, {
            text: "Payment", 
            value: "payment",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        },  {
            text: "Department", 
            value: "depart",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        },  {
            text: "ID", 
            value: "id",
            sortable: false,
            align: "left",
            width: 100,
            divider: true
        },  {
            text: "Time", 
            value: "zeit",
            sortable: false,
            align: "left",
            width: 120,
            divider: true
        },  {
            text: "Guest Name", 
            value: "gname",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        }
    ];
    return columm;
}