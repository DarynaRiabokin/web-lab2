import { uuid } from "../index.mjs";

class Product {
  constructor(name, producingCountry) {
    this.name = name;
    this.code = uuid();
    this.producingCountry = producingCountry;
  }
}

export default Product;
