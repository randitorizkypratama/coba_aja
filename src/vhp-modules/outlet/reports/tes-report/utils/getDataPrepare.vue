<script>
import ky from "ky";
export default {
  data: () => ({
    dataPrepare: []
  }),
  mounted: {
    writeDataPrepare() {
      (async () => {
        const parsed = await ky
          .post(
            "http://ws1.e1-vhp.com/VHPWebBased/rest/vhpINV/slowMovingList",
            {
              json: {
                request: {
                  inputUserkey: "6D83EFC6F6CA694FFC35FAA7D70AD308FB74A6CD",
                  inputUsername: "sindata",
                  storeNo: "1",
                  mainGrp: "1",
                  tage: "0",
                  showPrice: "true"
                }
              }
            }
          )
          .json();
        // const pbookList = parsed.response.sList["s-list"];
        console.log(parsed, "data");

        // this.datas = pbookList;
      })();
    }
  }
};
</script>
