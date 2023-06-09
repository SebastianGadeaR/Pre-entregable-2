import { productModel } from '../models/ProductModel.js';

export default class products {
    constructor() {
        console.log('Working products with DB')
    }

    async getAll() {
        const products = await productModel.find().lean();
        return products;
    }

    async save(product) {
        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products[this.products.length - 1].id + 1;
        }
        this.products.push(product);

        await fs.promises.writeFile(
            this.path,
            JSON.stringify(this.products, null, "\t")
        );
        return product;
    }

    getProductById = (id) => {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return "Product not found";
        } else {
            return this.products[productIndex];
        }
    }
    async deleteProductById (id) {
        const productIndex = this.products.findIndex((product) => product.id === id);
        if (productIndex === -1) {
            return "Product not found";
        } else {
            this.products.splice(productIndex,1);
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
        }
    }

    async updateProductByID (product) {
        const productIndex = this.products.findIndex((p) => product.id === p.id);
        if (productIndex === -1) {
            return "Product not found";
        } else {
            this.products.splice(productIndex,1);
            this.products.push(product)
            await fs.promises.writeFile(
                this.path,
                JSON.stringify(this.products, null, "\t")
            );
        }
    }
}