import Shop from "./models/Shop.mjs";
import Product from "./models/Product.mjs";
import Warehouse from "./models/Warehouse.mjs";
import ProductsInWarehouse from "./models/ProductsInWarehouse.mjs";

const addShopForm = document.getElementById("add-shop-form");
const addProductForm = document.getElementById("add-product-form");
const addWarehouseForm = document.getElementById("add-warehouse-form");
const addProductToWarehouseForm = document.getElementById(
  "add-product-to-warehouse-form"
);
const shopsTable = document.getElementById("shops-table");
const productsTable = document.getElementById("products-table");
const warehouseTable = document.getElementById("warehouses-table");
const productsInWarehousesTable = document.getElementById(
  "products-in-warehouses-table"
);

const chooseShopSelector = document.getElementById("choose-shop");
const warehouseIdSelector = document.getElementById("warehouse-id");
const productIdSelector = document.getElementById("product-id");

const shops = new Proxy([], {
  deleteProperty: function (shops, index) {
    const node = shopsTable.getElementById(shops[index].id);
    shopsTable.removeChild(node);

    const deletedShopNodeFromSelector = chooseShopSelector.childNodes[index];
    chooseShopSelector.childNodes.removeChild(deletedShopNodeFromSelector);

    delete shops[index];

    return true;
  },
  set: function (shops, index, shop) {
    if (shop instanceof Shop) {
      const chooseShopNode = document.createElement("option");
      chooseShopNode.value = shop.id;
      chooseShopNode.innerText = shop.name;
      const tableRow = document.createElement("tr");
      tableRow.id = shop.id;

      [shop.id, shop.name, shop.location].forEach((element) => {
        const rowChild = document.createElement("td");
        rowChild.innerText = element;
        tableRow.appendChild(rowChild);
      });

      chooseShopSelector.appendChild(chooseShopNode);
      shopsTable.appendChild(tableRow);
      shops[index] = shop;
    }

    return true;
  },
});

const products = new Proxy([], {
  deleteProperty: function (products, index) {
    const node = productsTable.getElementById(products[index].code);
    productsTable.removeChild(node);

    const deletedProductNode = productIdSelector.childNodes[index];
    productIdSelector.childNodes.removeChild(deletedProductNode);

    delete shops[index];

    return true;
  },
  set: function (products, index, product) {
    if (product instanceof Product) {
      const productIdNode = document.createElement("option");
      productIdNode.value = product.code;
      productIdNode.innerText = product.code;
      const tableRow = document.createElement("tr");
      tableRow.id = product.code;

      [product.code, product.name, product.producingCountry].forEach(
        (element) => {
          const rowChild = document.createElement("td");
          rowChild.innerText = element;
          tableRow.appendChild(rowChild);
        }
      );

      productIdSelector.appendChild(productIdNode);
      productsTable.appendChild(tableRow);
      products[index] = product;
    }

    return true;
  },
});
const warehouses = new Proxy([], {
  deleteProperty: function (warehouses, index) {
    const node = warehouseTable.getElementById(warehouses[index].id);
    warehouseTable.removeChild(node);

    const deletedWarehouseNode = warehouseIdSelector.childNodes[index];
    warehouseIdSelector.childNodes.removeChild(deletedWarehouseNode);

    delete warehouses[index];

    return true;
  },
  set: function (warehouses, index, warehouse) {
    if (warehouse instanceof Warehouse) {
      const warehouseIdNode = document.createElement("option");
      warehouseIdNode.value = warehouse.id;
      warehouseIdNode.innerText = warehouse.id;
      const tableRow = document.createElement("tr");
      tableRow.id = warehouse.id;

      [warehouse.id, warehouse.shopId, warehouse.capacity].forEach(
        (element) => {
          const rowChild = document.createElement("td");
          rowChild.innerText = element;
          tableRow.appendChild(rowChild);
        }
      );

      warehouseIdSelector.appendChild(warehouseIdNode);
      warehouseTable.appendChild(tableRow);
      warehouses[index] = warehouse;
    }

    return true;
  },
});
const productsInWarehouse = new ProductsInWarehouse(addProductToWarehouse, removeProductFromWarehouse);

addShopForm.onsubmit = (event) => {
  const shopName = event.target.elements["shop-name"].value;
  const shopLocation = event.target.elements["shop-location"].value;

  shops.push(new Shop(shopName, shopLocation));

  return false;
};

addProductForm.onsubmit = (event) => {
  const productName = event.target.elements["product-name"].value;
  const producingCountry = event.target.elements["producing-country"].value;

  products.push(new Product(productName, producingCountry));

  return false;
};

addWarehouseForm.onsubmit = (event) => {
  const capacity = event.target.elements.capacity.value;
  const selectedShopId = event.target.elements["choose-shop"].value;

  warehouses.push(new Warehouse(selectedShopId, capacity));

  return false;
};

addProductToWarehouseForm.onsubmit = (event) => {
  const warehouseId = event.target.elements["warehouse-id"].value;
  const productId = event.target.elements["product-id"].value;

  productsInWarehouse.addProduct(warehouseId, productId);

  return false;
};

function addProductToWarehouse({ productId, warehouseId }) {
  const productRow = document.createElement("tr");
  productRow.id = `${productId}_${warehouseId}`;

  [productId, warehouseId].forEach((element) => {
    const rowChild = document.createElement("td");
    rowChild.innerText = element;
    productRow.appendChild(rowChild);
  });

  productsInWarehousesTable.appendChild(productRow);
}

function removeProductFromWarehouse({ productId, warehouseId }) {
  const node = productsInWarehousesTable.getElementById(`${productId}_${warehouseId}`);
  productsInWarehousesTable.removeChild(node);
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
