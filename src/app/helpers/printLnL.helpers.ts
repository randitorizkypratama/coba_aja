export function addLnLVariable(object, key, value) {
	key = key.replace("$","");
	key = "$" + key;

	if (object["variable-list"] == null) {
		object["variable-list"] = [];
	}	

	object["variable-list"].push({"varKey":key,"varValue":value})
}

export function printLnL (licenseNr, lstName, printCase, variableList, columnTitleList, dataList) {
	lstName = lstName.replace(".lst","");
	lstName = lstName + ".lst";

	const fieldList = columnTitleList.map(item => item.field);

	const printRequest = {
		"request": {
			licenseNr,
			lstName,
			printCase,
			variableList,
			"titleList": generateLnLColumnTitleList(columnTitleList),
			"dataList": generateLnLDataList(dataList, fieldList)
		}
	}

	localStorage.setItem("licenseNr", licenseNr);
	localStorage.setItem("lstName", lstName);
	localStorage.setItem("printRequest", JSON.stringify(printRequest));

//	console.log(localStorage.getItem("printRequest"));

	window.open('/gl/print-rc', '_blank');

	function generateLnLDataList(list, fields) {
		const dataList = [] as any;

		if (list != [] && list != null) {
			list.forEach(generateDataList)
		}

		function generateDataList (item, index, arr) {
			// Delimiter for list and label printing is ASCII 2;
			const lnlDelimiter = String.fromCharCode(2);
			let data = '';

			for (let i=0; i<fields.length; i++) {
				data = data +  item[fields[i]] + lnlDelimiter;
			}
			data = data.slice(0, -1);
			const obj = {"dataStr":data};	

			dataList.push(obj);
		}

		const tempTableDataList = {"data-list":dataList}

		return tempTableDataList;
	}

	function generateLnLColumnTitleList(list) {
		const columnTitleList = [] as any;

		if (list != [] && !list != null) {
			list.forEach(generateColumnTitleList);
		}

		function generateColumnTitleList(item, index, arr) {
			columnTitleList.push({'titleNr':columnTitleList.length + 1, 'titleStr':item['label']});
		}

		const columnTitleObj = {"title-list" : columnTitleList}

		return columnTitleObj;
	}
}

export default {
    addLnLVariable, 
    printLnL,
}