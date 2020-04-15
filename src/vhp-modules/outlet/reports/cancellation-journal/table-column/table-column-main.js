export default function mainColumns() {
    const columm = [
        {
            text: "Date",
            value: "billdate",
            sortable: false,
            align: "left",
            width: 120,
            divider: true
        },{
            text: "TbNo", 
            value: "tbno",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        }, {
            text: "Bill-No", 
            value: "rechnr",
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
            value: "bezeich",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
            },{
            text: "Cancel Reason", 
            value: "cancel",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        }, {
            text: "Qty", 
            value: "qty",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        },  {
            text: "Amount", 
            value: "amount",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        }, {
            text: "Department", 
            value: "depart",
            sortable: false,
            align: "left",
            width: 180,
            divider: true
        },  {
            text: "Time", 
            value: "zeit",
            sortable: false,
            align: "center",
            width: 120,
            divider: true
        }, {
            text: "Name", 
            value: "cname",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        }, {
            text: "", 
            value: "actions",
            sortable: false,
            divider: true
        }
    ];
    return columm;
}