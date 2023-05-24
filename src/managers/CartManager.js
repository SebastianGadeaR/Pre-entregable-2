import { cartModel } from '../models/CartModel.js';

export default class Carts {
  constructor() {
      console.log('Working carts with DB')
  }

  getAll = async () => {
    const carts = await cartModel.find().lean();
    return carts;
}

  async save(cart) {
    const result = await cartModel.create(cart);
    if (this.carts.length === 0) {
      cart.id = 1;
    } else {
      cart.id = this.carts[this.carts.length - 1].id + 1;
    }

    this.carts.push(cart);
    await cartModel(
      JSON.stringify(this.carts, null, "\t")
    );
    return result;
  }

  async getById(id) {
    const cart = this.carts.find((cart) => cart.id === id);
    return cart;
  }

  async readCarts() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path, (error, data) => {
        if (error) {
          reject(error);
        } else {
          try {
            this.carts = JSON.parse(data);
            resolve(this.carts);
          } catch (error) {
            reject(error);
          }
        }
      });
    });
  }

  async writeCarts() {
    return new Promise((resolve, reject) => {
      fs.writeFile(this.path, JSON.stringify(this.carts), (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  async deleteProductCart (id) {
    const productIndex = this.cart.product.findIndex((product) => product.id === id);
    if (productIndex === -1) {
        return "Product not found";
    } else {
        this.cart.product.splice(productIndex,1);
        await CartModel(
            JSON.stringify(this.cart.product, null, "\t")
        );
    }
  }

}