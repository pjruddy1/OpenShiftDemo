import axios from "axios";

const BASE_URL = "https://backend-api-1-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/carts";
const Shirts_BASE_URL = "https://backend-api-1-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/getAllShirtIds";

export class CartAPI {
  static async getCart(id) {
    return (await axios.get(`${BASE_URL}/${id}`)).data;
  }

  static async getAllShirtIds(id) {
    return (await axios.get(`${Shirts_BASE_URL}/${id}`)).data;
  }
}