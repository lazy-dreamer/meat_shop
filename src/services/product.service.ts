import Data from '../bacarus.json'

export interface IProductArr {
  "id": number;
  "name": string;
  "productImage": string;
  "images": string[];
  "price": number;
  "priceUnit": string;
  "weight": number;
  "weightUnit": string;
  "link": string;
  "description": string[];
  "features": string[][];
  "type": string[]
}

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const ProductService = {
  async getAllCategories() {
    await delay(300);
    return Data.categories;
  },
  async getAll() {
    await delay(300);
    return Data.products;
  },
  async getDiscounts() {
    await delay(300);
    return Data.discounts;
  },
  async getDescriptors() {
    await delay(300);
    return Data.productFieldsDescriptor;
  },
  async getById(id: number) {
    await delay(300);
    return Data.products[id];
  },
  productItemToArr(item: IProductArr) {
    let {id, productImage, name, price, priceUnit, weight, weightUnit, type} = item;
    return [id, productImage, name, price, priceUnit, weight, weightUnit, type]
  }
}