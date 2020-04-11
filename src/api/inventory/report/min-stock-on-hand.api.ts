import ky from "ky";

async function prepareData(url: string, params: any){
	return new Promise((resolve, reject) => {
    resolve(ky
      .post(url + "vhpINV/minOHPrepare", {
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

async function loadData(url: string, params: any){
	return new Promise((resolve, reject) => {
    resolve(ky
      .post(url + "vhpINV/minOHList", {
        json: {
          request: {
            inputUserkey: params.inputUserkey,
            inputUsername: params.inputUsername,
            sorttype: params.sorttype,
            mainGrp: params.mainGrp,
            fromStore3: params.fromStore3,
            toStore3: params.toStore3,
            showPrice: params.showPrice
          }
        }
      })
      .json()
    )
  })
}

export default {prepareData, loadData};
