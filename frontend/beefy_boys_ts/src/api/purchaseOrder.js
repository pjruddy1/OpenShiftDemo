import axios from "axios";

const BASE_URL = "https://bbt-backend-api-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/orders";

export class POAPI {
  static async createPurchaseOrder(formValues){
    return (await axios.post(`${BASE_URL}`, formValues)).data;
  }
  
}