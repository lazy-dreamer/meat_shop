import Data from '../bacarus.json'

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
  async getById(id) {
    return Data.products[id];
  },
  productItemToArr(item) {
    // console.log(item)
    let {id, productImage, name, price, priceUnit, weight, weightUnit, type} = item;
    return [id, productImage, name, price, priceUnit, weight, weightUnit, type ]
  }
}