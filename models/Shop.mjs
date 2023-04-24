import { uuid } from "../index.mjs";

class Shop {
  constructor(name, location) {
    this.name = name;
    this.location = location;
    this.id = uuid();
  }
}

export default Shop;
