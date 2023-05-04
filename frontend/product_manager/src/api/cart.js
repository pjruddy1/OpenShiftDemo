import axios from "axios";

const BASE_URL = "http://localhost:50001/carts";
const Shirts_BASE_URL = "http://localhost:50001/getAllShirtIds";

export class CartAPI {
  static async getCart(id) {
    return (await axios.get(`${BASE_URL}/${id}`)).data;
  }

  static async getAllShirtIds(id) {
    return (await axios.get(`${Shirts_BASE_URL}/${id}`)).data;
  }
}