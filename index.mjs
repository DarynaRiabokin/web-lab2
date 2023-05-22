import Shop from "./models/Shop.mjs";
import Product from "./models/Product.mjs";
import Warehouse from "./models/Warehouse.mjs";
import ProductsInWarehouse from "./models/ProductsInWarehouse.mjs";
import ProductInStore from "./models/ProductsInStore.mjs";

const addShopForm = document.getElementById("add-shop-form");
const addProductForm = document.getElementById("add-product-form");
const addWarehouseForm = document.getElementById("add-warehouse-form");
const addProductToStoreForm = document.getElementById("add-product-to-store-form");
const removeProductFromStoreForm = document.getElementById("remove-product-from-store-form");
const transferForm = document.getElementById("transfer-product-form");
const addProductToWarehouseForm = document.getElementById(
  "add-product-to-warehouse-form"
);

const productsInShopsTable = document.getElementById("products-in-stores-table");
const shopsTable = document.getElementById("shops-table");
const productsTable = document.getElementById("products-table");
const warehouseTable = document.getElementById("warehouses-table");
const productsInWarehousesTable = document.getElementById(
  "products-in-warehouses-table"
);

const chooseShopSelector = document.getElementById("choose-shop");
const warehouseIdSelector = document.getElementById("warehouse-id");
const productIdSelector = document.getElementById("product-id");
const addWarehouseIdSelector = document.getElementById("add-warehouse-id");
const removeWarehouseIdSelector = document.getElementById("remove-warehouse-id");
const addProductIdSelector = document.getElementById("add-product-id");
const removeProductIdSelector = document.getElementById("remove-product-id");
const addStoreIdSelector = document.getElementById("add-store-id");
const removeStoreIdSelector = document.getElementById("remove-store-id");
const transferSelector1 = document.getElementById("warehouse-id-1");
const transferSelector2 = document.getElementById("warehouse-id-2");

const tempBody = new Map();

const shops = new Proxy([], {
  deleteProperty: function (arr, index) {
    const node = document.getElementById(`shop-${arr[index].id}`);
    node.parentNode.removeChild(node);

    const deletedShopNodeFromSelector = chooseShopSelector.childNodes[index];
    chooseShopSelector.removeChild(deletedShopNodeFromSelector);

    arr.splice(index, 1);

    return true;
  },
  set: function (arr, index, shop) {
    if (shop instanceof Shop) {
      const chooseShopNode = document.createElement("option");
      chooseShopNode.value = shop.id;
      chooseShopNode.innerText = shop.name;
      const tableRow = document.createElement("tr");
      tableRow.id = `shop-${shop.id}`;

      const deleteChild = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.innerText = "X";
      deleteButton.onclick = () => {
        delete shops[index];
      };
      deleteChild.appendChild(deleteButton);
      tableRow.appendChild(deleteChild);

      [shop.id, shop.name, shop.location].forEach((element) => {
        const rowChild = document.createElement("td");
        rowChild.innerText = element;
        tableRow.appendChild(rowChild);
      });

      chooseShopSelector.appendChild(chooseShopNode.cloneNode(true));
      addStoreIdSelector.appendChild(chooseShopNode.cloneNode(true));
      removeStoreIdSelector.appendChild(chooseShopNode.cloneNode(true));
      shopsTable.appendChild(tableRow);
      arr[index] = shop;
    }

    return true;
  },
});

const products = new Proxy([], {
  deleteProperty: function (arr, index) {
    const node = document.getElementById(`product-${arr[index].code}`);
    node.parentNode.removeChild(node);

    const deletedProductNode = productIdSelector.childNodes[index];
    productIdSelector.removeChild(deletedProductNode);

    arr.splice(index, 1);

    return true;
  },
  set: function (arr, index, product) {
    if (product instanceof Product) {
      const productIdNode = document.createElement("option");
      productIdNode.value = product.code;
      productIdNode.innerText = product.code;
      const tableRow = document.createElement("tr");
      tableRow.id = `product-${product.code}`;

      const deleteChild = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.innerText = "X";
      deleteButton.onclick = () => {
        delete products[index];
      };
      deleteChild.appendChild(deleteButton);
      tableRow.appendChild(deleteChild);

      [product.code, product.name, product.producingCountry].forEach(
        (element) => {
          const rowChild = document.createElement("td");
          rowChild.innerText = element;
          tableRow.appendChild(rowChild);
        }
      );

      productIdSelector.appendChild(productIdNode);
      productsTable.appendChild(tableRow);
      arr[index] = product;
    }

    return true;
  },
});
const warehouses = new Proxy([], {
  deleteProperty: function (arr, index) {
    const node = document.getElementById(`warehouse-${arr[index].id}`);
    node.parentNode.removeChild(node);

    const deletedWarehouseNode = warehouseIdSelector.childNodes[index];
    warehouseIdSelector.removeChild(deletedWarehouseNode);

    arr.splice(index, 1);

    return true;
  },
  set: function (arr, index, warehouse) {
    if (warehouse instanceof Warehouse) {
      const warehouseIdNode = document.createElement("option");
      warehouseIdNode.value = warehouse.id;
      warehouseIdNode.innerText = warehouse.id;
      warehouseIdNode.selected = index === 0;
      const tableRow = document.createElement("tr");
      tableRow.id = `warehouse-${warehouse.id}`;

      const deleteChild = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger";
      deleteButton.innerText = "X";
      deleteButton.onclick = () => {
        delete warehouses[index];
      };
      deleteChild.appendChild(deleteButton);
      tableRow.appendChild(deleteChild);

      [warehouse.id, warehouse.shopId, warehouse.capacity].forEach(
        (element) => {
          const rowChild = document.createElement("td");
          rowChild.innerText = element;
          tableRow.appendChild(rowChild);
        }
      );

      warehouseIdSelector.appendChild(warehouseIdNode.cloneNode(true));
      addWarehouseIdSelector.appendChild(warehouseIdNode.cloneNode(true));
      removeWarehouseIdSelector.appendChild(warehouseIdNode.cloneNode(true));
      transferSelector1.appendChild(warehouseIdNode.cloneNode(true));
      transferSelector2.appendChild(warehouseIdNode.cloneNode(true));
      warehouseTable.appendChild(tableRow);
      arr[index] = warehouse;
    }

    return true;
  },
});
const productsInWarehouse = new ProductsInWarehouse(
  addProductToWarehouse,
  removeProductFromWarehouse
);

const productsInShops = new ProductInStore(
  addProductToStore,
  removeProductFromStore
);

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

addProductToStoreForm.onsubmit = (event) => {
  const shopId = event.target.elements["store-id"].value;
  const productId = event.target.elements["product-id"].value;
  const warehouseId = event.target.elements["warehouse-id"].value;

  productsInWarehouse.removeProduct(warehouseId, productId);
  productsInShops.addProduct(shopId, productId);

  return false;
};

removeProductFromStoreForm.onsubmit = (event) => {
  const shopId = event.target.elements["store-id"].value;
  const productId = event.target.elements["product-id"].value;
  const warehouseId = event.target.elements["warehouse-id"].value;

  productsInShops.removeProduct(shopId, productId);
  productsInWarehouse.addProduct(warehouseId, productId);

  return false;
};

transferForm.onsubmit = (event) => {
  const warehouseId1 = event.target.elements["warehouse-id-1"].value;
  const warehouseId2 = event.target.elements["warehouse-id-2"].value;
  const productId = event.target.elements["transfer-product-id"].value;

  const warehouse1 = warehouses.findIndex(el => el.id === warehouseId1);
  const warehouse2 = warehouses.findIndex(el => el.id === warehouseId2);

  if (warehouses[warehouse1].shopId !== warehouses[warehouse2].shopId) {
    return false;
  }

  productsInWarehouse.transfer(warehouse1, warehouseId2, productId);

  return false;
}

document.querySelectorAll(".search").forEach(searchElement => {
  const section = searchElement.dataset.search;
  searchElement.addEventListener("change", (event) => {
    getSearch(section, event.target.value);
  });
});

addWarehouseIdSelector.addEventListener("change", (event) => {
  const warehouseId = event.target.value;
  
  updateAddWarehouseIdSelector(warehouseId);
});

removeStoreIdSelector.addEventListener("change", (event) => {
  const storeId = event.target.value;
  
  updateRemoveStoreIdSelector(storeId);
});

function updateRemoveStoreIdSelector(storeId) {
  const products = productsInShops.getByStoreId(storeId);
  removeProductIdSelector.innerHTML = '';

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.productId;
    option.innerText = product.productId;
    removeProductIdSelector.appendChild(option);
  });
}


function updateAddWarehouseIdSelector(warehouseId, select = addProductIdSelector) {
  const products = productsInWarehouse.getByWarehouseId(warehouseId);
  select.innerHTML = '';

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.productId;
    option.innerText = product.productId;
    select.appendChild(option);
  });
}

function addProductToStore({ productId, storeId }, removeItem) {
  const productRow = document.createElement("tr");
  productRow.id = `${productId}_${storeId}`;

  const deleteChild = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "X";
  deleteButton.onclick = removeItem;
  deleteChild.appendChild(deleteButton);
  productRow.appendChild(deleteChild);

  [storeId, productId].forEach((element) => {
    const rowChild = document.createElement("td");
    rowChild.innerText = element;
    productRow.appendChild(rowChild);
  });

  productsInShopsTable.appendChild(productRow);
}

function removeProductFromStore({ productId, storeId }) {
  const node = document.getElementById(`${productId}_${storeId}`);
  node.parentNode.removeChild(node);
}

function addProductToWarehouse({ productId, warehouseId }, removeItem) {
  const warehouse = warehouses.find(el => el.id === warehouseId);

  if (warehouse.capacity <= productsInWarehouse.products.length) {
    return;
  }

  const productRow = document.createElement("tr");
  productRow.id = `${productId}_${warehouseId}`;

  const deleteChild = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger";
  deleteButton.innerText = "X";
  deleteButton.onclick = removeItem;
  deleteChild.appendChild(deleteButton);
  productRow.appendChild(deleteChild);

  [productId, warehouseId].forEach((element) => {
    const rowChild = document.createElement("td");
    rowChild.innerText = element;
    productRow.appendChild(rowChild);
  });

  productsInWarehousesTable.appendChild(productRow);
}

function removeProductFromWarehouse({ productId, warehouseId }) {
  const node = document.getElementById(`${productId}_${warehouseId}`);
  node.parentNode.removeChild(node);
}

export function uuid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function loadFromStorage(key, Class, target) {
  let fromStorage = localStorage.getItem(key);
  fromStorage = JSON.parse(fromStorage);

  if (Array.isArray(target)) {
    fromStorage.forEach((el) => {
      target.push(Object.assign(new Class(), el));
    });
  } else {
    fromStorage.products = fromStorage.products.forEach(product => {
      product = Object.assign(new Class(), product);
      target.addProduct(product.warehouseId, product.productId);
    });
  }
}

function getSearch(section, search) {
  let element = document.querySelector(`#${section}-table`);

  if (!search.trim() && tempBody.has(section)) {
    const parent = element.parentElement;
    parent.removeChild(element);
    parent.appendChild(tempBody.get(section));
    tempBody.delete(section);
    return;
  }

  if (!tempBody.has(section)) {
    tempBody.set(section, element.cloneNode(true));
  } else {
    const parent = element.parentElement;
    parent.removeChild(element);
    element = tempBody.get(section).cloneNode(true);
    parent.appendChild(element);
  }

  const rows = element.querySelectorAll("tr");

  for (const row of rows) {
    const tds = row.querySelectorAll("td");

    if (!Array.from(tds).some(el => el.innerText.includes(search.trim()))) {
      row.parentElement.removeChild(row);
    }
  }
}

document.getElementById("warehouse-id-1").addEventListener("change", (event) => {
  updateAddWarehouseIdSelector(event.target.value, document.getElementById("transfer-product-id"));
});

window.addEventListener("load", () => {
  try {
    loadFromStorage('shops', Shop, shops);
    loadFromStorage('warehouses', Warehouse, warehouses);
    loadFromStorage('products', Product, products);
    loadFromStorage('productsInWarehouse', Product, productsInWarehouse);
  } catch (e) {
    console.log(e);
  } finally {
    updateAddWarehouseIdSelector(addWarehouseIdSelector.value);
    updateAddWarehouseIdSelector(document.getElementById("warehouse-id-1").value, document.getElementById("transfer-product-id"));
    updateRemoveStoreIdSelector(removeStoreIdSelector.value);
  }
});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("shops", JSON.stringify(shops));
  localStorage.setItem("warehouses", JSON.stringify(warehouses));
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("productsInWarehouse", JSON.stringify(productsInWarehouse));
});
