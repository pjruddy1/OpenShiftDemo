import axios from "axios";

const BASE_URL = "http://localhost:8088/shirts";


const instance = axios.create({
  baseURL: 'http://localhost:8088',
});

export class ProductAPI {
  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }
  static async updateById(id, values) {
    return this.formatId((await axios.put(`${BASE_URL}/${id}`, values)).data);
  }
  static async fetchById(productId) {
    return this.formatId((await axios.get(`${BASE_URL}/${productId}`)).data);
  }

  static formatId(product) {
    return {
      ...product,
      id: product.shirtId.toString(),
    };
  }
}