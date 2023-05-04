import axios from "axios";

const BASE_URL = "http://localhost:50001/carts";
const BASE_ADD_URL = "http://localhost:50001/addShirtToCart";
const BASE_REMOVE_URL = "http://localhost:50001/removeShirtFromCart";

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