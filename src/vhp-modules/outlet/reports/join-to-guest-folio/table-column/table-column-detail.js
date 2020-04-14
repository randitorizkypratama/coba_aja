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
            text: "Qty", 
            value: "anzahl",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        }, {
            text: "Description", 
            value: "bezeich",
            sortable: false,
            align: "left",
            width: 250,
            divider: true
        }, {
            text: "Price", 
            value: "epreis",
            sortable: false,
            align: "right",
            width: 150, 
            divider: true
        }, {
            text: "Description", 
            value: "bezeich",
            sortable: false,
            align: "left",
            width: 180,
            divider: true
            },{
            text: "Balance", 
            value: "betrag",
            sortable: false,
            align: "right",
            width: 150,
            divider: true
        }, {
            text: "No", 
            value: "waehrungsnr",
            sortable: false,
            align: "right",
            width: 100,
            divider: true
        },  {
            text: "Bill Date", 
            value: "bill-datum",
            sortable: false,
            align: "left",
            width: 100,
            divider: true
        }, {
            text: "Time", 
            value: "zeit",
            sortable: false,
            align: "left",
            width: 100,
            divider: true
        }
    ];
    return columm;
}