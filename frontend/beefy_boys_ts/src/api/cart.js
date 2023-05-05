import axios from "axios";

const BASE_URL = "https://bbt-backend-api-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/carts";
const BASE_ADD_URL = "https://bbt-backend-api-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/addShirtToCart";
const BASE_REMOVE_URL = "https://bbt-backend-api-ruddypj-pr-dev.apps.sandbox-m3.1530.p1.openshiftapps.com/removeShirtFromCart";

export class CartAPI {
  static async createCart(){
    return (await axios.post(`${BASE_URL}`)).data;
  }
  static async addProduct(product, cart) {
    return await axios.post(`${BASE_ADD_URL}/${product.shirtId.toString()}/${cart.cartId.toString()}`).data;
  }
  static async removeProduct(product, cart) {
    return await axios.delete(`${BASE_REMOVE_URL}/${product.shirtId.toString()}/${cart.cartId.toString()}`).data;
  }
  
}