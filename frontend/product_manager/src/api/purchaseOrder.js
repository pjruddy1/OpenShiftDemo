import axios from "axios";

const BASE_URL = "http://localhost:50000/orders";


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