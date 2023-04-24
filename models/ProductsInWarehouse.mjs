import Product from "./Product.mjs";

class ProductsInWarehouse {
  constructor(addProductCallback, removeProductCallback) {
    this.products = new Proxy([], {
      deleteProperty: function (products, index) {
        removeProductCallback(products[index]);

        delete products[index];

        return true;
      },
      set: function (products, index, product) {
        if (typeof product === "object") {
          addProductCallback(product);
          products[index] = product;
        }

        return true;
      },
    });
  }

  addProduct(warehouseId, productId) {
    this.products.push({ warehouseId, productId });
  }

  removeProduct(warehouseId, productId) {
    const index = this.products.findIndex(
      (product) =>
        product.productId === productId && product.warehouseId === warehouseId
    );
    this.products.splice(index, 1);
  }
}

export default ProductsInWarehouse;
