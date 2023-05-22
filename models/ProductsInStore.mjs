class ProductsInStore {
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
                  product.productId === el.productId && product.storeId === el.storeId
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
  
    addProduct(storeId, productId) {
      this.products.push({ storeId, productId });
    }

    getByStoreId(storeId) {
        return this.products.filter(product => product.storeId === storeId);
    }
  
    removeProduct(storeId, productId) {
      const index = this.products.findIndex(
        (product) =>
          product.productId === productId && product.storeId === storeId
      );

      if (index === -1) return;
     
      delete this.products[index];
    }
  }
  
  export default ProductsInStore;
  