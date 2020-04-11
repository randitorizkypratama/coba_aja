import ky from "ky";

async function loadStorage(url: string, params: any){
	return new Promise((resolve, reject) => {
    resolve(ky
      .post(url + "vhpINV/getStorage", {
        json: {
          request: {
            inputUserkey: params.inputUserkey,
            inputUsername: params.inputUsername
          }
        }
      })
      .json()
    )
  })
}

async function loadArticle(url: string, params: any){
	return new Promise((resolve, reject) => {
    resolve(ky
      .post(url + "Common/getAllArtikel", {
        json: {
          request: {
            inputUserkey: params.inputUserkey,
            inputUsername: params.inputUsername,
            sorttype: params.sorttype,
            lastArt: params.lastArt,
            lastArt1: params.lastArt1
          }
        }
      })
      .json()
    )
  })
}

async function loadData(url: string, params: any){
	return new Promise((resolve, reject) => {
    resolve(ky
      .post(url + "vhpINV/priceDiscrepancyReportList", {
        json: {
          request: {
            inputUserkey: params.inputUserkey,
            inputUsername: params.inputUsername,
            sorttype: params.sortBy,
            fromLager: params.fromStore3,
            toLager: params.toStore3,
            fromDate: params.fromDate,
            toDate: params.toDate,
            fromArt: params.fromArticle,
            toArt: params.toArticle,
            miRecChk: params.miRecChk,
            miOrdChk: params.miOrdChk,
            miAllChk: params.miAllChk
          }
        }
      })
      .json()
    )
  })
}

export default {loadStorage, loadArticle, loadData};
