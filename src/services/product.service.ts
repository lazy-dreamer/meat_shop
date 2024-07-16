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

export const ProductService = {
  async getAllCategories() {
    return Data.categories;
  },
  async getAll() {
    return Data.products;
  },
  async getDiscounts() {
    return Data.discounts;
  },
  async getDescriptors() {
    return Data.productFieldsDescriptor;
  },
  async getById(id: number) {
    return Data.products[id];
  },
  productItemToArr(item: IProductArr) {
    let {id, productImage, name, price, priceUnit, weight, weightUnit, type} = item;
    
    return [id, productImage, name, price, priceUnit, weight, weightUnit, type]
  }
}