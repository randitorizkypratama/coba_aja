<script>
import Vue from "vue";

Vue.mixin({
  methods: {
    mapDataInArray(data, valuekey, labelkey) {
        const dataMap = [];
        for(let i = 0; i < data.length; i++) {
            const dataobj = data[i];
            dataMap.push({
                value: dataobj[valuekey],
                label: dataobj[labelkey]
            });
        }
    return dataMap;
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
            formatDateRead: "DD/MM/YYYY",
            formateDateRequest: "MM/DD/YY",
            host: "http://182.253.140.35/VHPWebBased/rest"
        }
    }
}
</script>
