class ProductsInWarehouse {
  constructor(addProductCallback, removeProductCallback) {
    const products = new Proxy([], {
      deleteProperty: function (arr, index) {
        removeProductCallback(arr[index]);

        arr.splice(index, 1);

        return true;
      },
      set: function (arr, index, product) {
        if (typeof product === "object") {
          addProductCallback(product, () => {
            const index = products.findIndex(
              (el) =>
                product.productId === el.productId && product.warehouseId === el.warehouseId
            );
           
            delete products[index];
          });
          arr[index] = product;
        }

        return true;
      },
    });

    this.products = products;
  }

  addProduct(warehouseId, productId) {
    this.products.push({ warehouseId, productId });
  }

  removeProduct(warehouseId, productId) {
    const index = this.products.findIndex(
      (product) =>
        product.productId === productId && product.warehouseId === warehouseId
    );
   
    delete this.products[index];
  }
}

export default ProductsInWarehouse;
