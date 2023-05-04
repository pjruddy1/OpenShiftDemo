import axios from "axios";

const BASE_URL = "http://localhost:50000/orders";

export class POAPI {
  static async createPurchaseOrder(formValues){
    return (await axios.post(`${BASE_URL}`, formValues)).data;
  }
  
}