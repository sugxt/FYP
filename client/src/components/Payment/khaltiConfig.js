import myKey from "./khaltiKey";
import axios from "axios";

let config = {
    // replace this key with yours
    "publicKey": myKey.publicTestKey,
    "productIdentity": "1234567890",
    "productName": "eKalah",
    "productUrl": "http://gameofthrones.com/buy/Dragons",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
            let data = {
                "token": payload.token,
                "amount": payload.amount
              };
              
              let config = {
                headers: {'Authorization': myKey.secretKey}
              };
              
              axios.post("/package/buy",{token:payload.token,amount:payload.amount,key:myKey.secretKey})
              .then(response => {
                console.log(response.data);
              })
              .catch(error => {
                console.log(error);
              });
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config