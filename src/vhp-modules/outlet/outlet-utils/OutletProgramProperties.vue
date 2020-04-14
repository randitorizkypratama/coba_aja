<script>
import Vue from "vue";

Vue.mixin({
  methods: {
    mapDataInArray(data, valuekey, labelkey1, labelkey2) {
        const dataMap = [];
        for(let i = 0; i < data.length; i++) {
            const dataobj = data[i];
            dataMap.push({
                value: dataobj[valuekey],
                label: dataobj[labelkey1] + " - " + dataobj[labelkey2]
            });
        }
        return dataMap;
    },
    displayTime(time) {
        const hourTemp = parseInt(time / 3600);
        const minTemp = parseInt((time / 3600 - hourTemp) * 60);
        const secTemp = parseInt(time - hourTemp * 3600 - minTemp * 60);
        const hour = hourTemp < 10 ? "0" + hourTemp : hourTemp;
        const min = minTemp < 10 ? "0" + minTemp : minTemp;
        const sec = secTemp < 10 ? "0" + secTemp : secTemp;
        return hour + ":" + min + ":" + sec;
    },
    formatterMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
            decimalCount = Math.abs(decimalCount);
            decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

            const negativeSign = amount < 0 ? "-" : "";

            const i = parseInt(
            (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
            ).toString();
            const j = i.length > 3 ? i.length % 3 : 0;

            return (
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount
                ? decimal +
                Math.abs(amount - i)
                    .toFixed(decimalCount)
                    .slice(2)
                : "")
            );
        } catch (e) {
            console.log(e);
        }
    },
    getData(endpoint, bodyvalue) {
        const dataPayload = {
            data: [], 
            success: false,
            isLoading: true
        };

        (async () => {
	        class HTTPError extends Error {}

        	const response = await fetch(this.programProperties.host + endpoint, {
		        method: 'POST',
		        body: JSON.stringify(bodyvalue),
		        headers: {
                    'content-type': 'application/json'
		        }
	        });

        	if (!response.ok) {
                dataPayload["data"] = {};
                dataPayload["success"] = false;
                dataPayload["isLoading"] = false;
                
                throw new HTTPError('Fetch error:', response.statusText);
    	    } else {
            	const parsed = await response.json();

                dataPayload["data"] = parsed.response;
                dataPayload["success"] = true;
                dataPayload["isLoading"] = false;

                console.log(dataPayload, "Response" + endpoint + " : ");

            }
            // this.$emit(`emitDataPayload`, dataPayload);

        })();
        return dataPayload;
    }
  }
})

export default {
    name: "OutletProgamProperties",
    data() {
        return {
                dataPayloads: {data: {}, 
                success: false,
                isLoading: true
            },
            formatDateRead: "DD-MM-YYYY",
            formateDateRequest: "MM/DD/YY",
            host: "http://182.253.140.35/VHPWebBased/rest",
            validationSelectEmpty: [v => !!v || 'Select One']
        }
    }
}
</script>
