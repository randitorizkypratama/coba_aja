export default function mainColumns() {
    const columm = [];
    let j = 1;

    for(let i=0; i<7; i++) {
        if (i == 0) {
            columm.splice(i, 0, {
                text: "RmNo",
                value: "zinr",
                sortable: false,
                align: "right",
                width: 120,
                divider: true                
            }); 
        } else if (i == 1) {
            columm.splice(i, 0, {
                text: "Guest Name", 
                value: "name",
                sortable: false,
                align: "left",
                width: 180,
                divider: true
            });
        } else if (i == 2) {
            columm.splice(i, 0, {
                text: "ResNo", 
                value: "resnr",
                sortable: false,
                align: "right",
                width: 150,
                divider: true
            });
        } else if (i == 3) {
            columm.splice(i, 0, {
                text: "Arrival", 
                value: "ankunft",
                sortable: false,
                align: "left",
                width: 120, 
                divider: true
            });
        } else if (i == 4) {
            columm.splice(i, 0, {
                text: "Departure", 
                value: "abreise",
                sortable: false,
                align: "left",
                width: 120,
                divider: true
            });
        } else if (i == 5) {
            columm.splice(i, 0, {
                text: "Used", 
                value: "used",
                sortable: false,
                align: "right",
                width: 80,
                divider: true
            });
        } else {
            for(let x = 6; x<37; x++) {
                columm.splice(x, 0, {
                    text: (j < 10) ? '0' + j.toString() : j.toString(), 
                    value: "verbrauch"+j,
                    sortable: false,
                    align: "right",
                    width: 100,
                    divider: true
                });
                j++;
            }

        }
    }
    
    return columm;
}