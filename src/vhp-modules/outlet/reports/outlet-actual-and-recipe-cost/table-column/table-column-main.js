export default function mainColumns() {
    const columm = [
        {
            text: "ArtNo",
            value: "artnr",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
        },{
            text: "Description", 
            value: "bezeich",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        }, {
            text: "Qty-(Actual)", 
            value: "sQty2",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
        }, {
            text: "Qty-(Recipe)", 
            value: "sQty1",
            sortable: false,
            align: "right",
            width: 120, 
            divider: true
        }, {
            text: "Variance", 
            value: "dval",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
            },{
            text: "Amount-(Actual)", 
            value: "val2",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        }, {
            text: "Amount-(Recipe)", 
            value: "val1",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        },  {
            text: "Variance", 
            value: "sQty3",
            sortable: false,
            align: "right",
            width: 180,
            divider: true
        }, {
            text: "Unit", 
            value: "munit",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
        }
    ];
    return columm;
}