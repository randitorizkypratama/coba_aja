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
            value: "tb",
            sortable: false,
            align: "center",
            width: 100,
            divider: true
        }, {
            text: "Bill-No", 
            value: "billno",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "ArtNo", 
            value: "artno",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        }, {
            text: "Description", 
            value: "descr",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
            },{
            text: "Qty", 
            value: "qty",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        }, {
            text: "Amount", 
            value: "amount",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        },  {
            text: "Department", 
            value: "depart",
            sortable: false,
            align: "left",
            width: 150,
            divider: true
        }, {
            text: "Time", 
            value: "zeit",
            sortable: false,
            align: "center",
            width: 100,
            divider: true
        },  {
            text: "ID", 
            value: "id",
            sortable: false,
            align: "center",
            width: 100,
            divider: true
        }, {
            text: "TB", 
            value: "tb",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        }
    ];
    return columm;
}