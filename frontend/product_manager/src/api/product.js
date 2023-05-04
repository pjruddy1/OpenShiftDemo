import axios from "axios";

const BASE_URL = "http://localhost:8088/shirts";


const instance = axios.create({
  baseURL: 'http://localhost:8088',
});

export class ProductAPI {
  static async create(formValues) {
    console.log(formValues);
    return this.formatId((await instance.post(`${BASE_URL}`, formValues)).data);
  }
  static async fetchAll() {
    return (await axios.get(`${BASE_URL}`)).data.map(this.formatId);
  }
  static async deleteById(productId) {
    return (await axios.delete(`${BASE_URL}/${productId}`)).data;
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