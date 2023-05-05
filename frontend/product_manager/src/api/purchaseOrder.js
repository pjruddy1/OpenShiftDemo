import axios from "axios";

const BASE_URL = "https://backend-api-1-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/orders";


const instance = axios.create({
  baseURL: 'http://localhost:50000',
});

export class PurchaseOrderAPI {
  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }
  static async updateById(id, values) {
    return this.formatId((await axios.put(`${BASE_URL}/${id}`, values)).data);
  }
  static async fetchById(id) {
    return this.formatId((await axios.get(`${BASE_URL}/${id}`)).data);
  }

  static formatId(purchaseOrder) {
    return {
      ...purchaseOrder,
      id: purchaseOrder.id.toString(),
    };
  }
}