export default function mainColumns() {
    const columm = [
        {
            text: "ArtNo",
            value: "artno",
            sortable: false,
            align: "right",
            width: 120,
            divider: true
        },{
            text: "Description", 
            value: "descr",
            sortable: false,
            align: "left",
            width: 200,
            divider: true
        }, {
            text: "Day Nett", 
            value: "day-net",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "Day Gross", 
            value: "day-gros",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        },{
            text: "%", 
            value: "day-proz",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        }, {
            text: "Todate Nett", 
            value: "todate-net",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
            },{
            text: "Todate Gross", 
            value: "todate-gros",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "%", 
            value: "todate-proz",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        },  {
            text: "MTD Qty", 
            value: "mqty",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        }
    ];
    return columm;
}