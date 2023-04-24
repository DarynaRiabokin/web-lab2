import { uuid } from "../index.mjs";

class Warehouse {
  constructor(shopId, capacity) {
    this.shopId = shopId;
    this.id = uuid();
    this.capacity = capacity;
  }
}

export default Warehouse;
