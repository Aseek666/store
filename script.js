var getCatalog = {};
var getCart = {};

// Загругзка данных товара с сервера dummyjson

function loadCatalog() {
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(showCatalog);
}

// Функция обработки данных для карточек товара
function showCatalog(catalog) {

  var catalogElem = document.getElementById('catalog');
  catalogElem.innerHTML = '';
  for (var i = 0; i < 10; i++) {
    var item = catalog.products[i];
    getCatalog[item.id] = item;
    var itemElem = document.createElement('div');
    itemElem.innerHTML = '<img class="img" src='+ item.images[0] +'>' +
                         '<h3 class="title">' + item.title + '</h3>' +
                         '<p class="price">Цена: ' + item.price + ' $.</p>' +
                         '<button class="btn" onclick="addToCart(' + item.id + ')">Добавить в корзину</button>';
    
    catalogElem.appendChild(itemElem);
  }
}

loadCatalog();



// Функция добавления товара в корзину

function addToCart(itemId) {
  var cart = getCart;

  if (cart[itemId]) {
    cart[itemId]++;
  } else {
    cart[itemId] = 1;
  }
  
  getCart = cart;
  updateCartCount();
}

// Функция обновления количества товаров в корзине

function updateCartCount() {
  var cart = getCart;
  var count = 0;
  console.log(getCatalog)
  for (var itemId in cart) {
    console.log('ID: ' + itemId + ' Count: ' + cart[itemId])
    if (cart[itemId] == 1) {
    if (document.getElementById("cart_count_" + itemId) == null) { 
    var cartCountElem = document.getElementById('cart');

    var itemElem = document.createElement('div');
    itemElem.innerHTML = '<button class="catalog_btn" onclick="deleteFromCart('+itemId+')">Удалить</button>';
    itemElem.classList.add("cart_x");
    itemElem.id = "cart_x_" + itemId;
    cartCountElem.appendChild(itemElem);
  
    var itemElem = document.createElement('div');
    itemElem.innerHTML = '<img class="catalog_img" src="' + getCatalog[itemId].images[0] + '">';
    itemElem.classList.add("cart_img");
    itemElem.id = "cart_img_" + itemId;
    cartCountElem.appendChild(itemElem);

    var itemElem = document.createElement('div');
    itemElem.innerHTML = getCatalog[itemId].title;
    itemElem.classList.add("cart_title");
    itemElem.id = "cart_title_" + itemId;
    cartCountElem.appendChild(itemElem);

    var itemElem = document.createElement('div');
    itemElem.innerHTML = getCatalog[itemId].price;
    itemElem.classList.add("cart_price");
    itemElem.id = "cart_price_" + itemId;
    cartCountElem.appendChild(itemElem);

    var itemElem = document.createElement('div');
    itemElem.innerHTML = cart[itemId];
    itemElem.classList.add("cart_count")
    itemElem.id = "cart_count_" + itemId;
    cartCountElem.appendChild(itemElem);

    var itemElem = document.createElement('div');
    itemElem.innerHTML = cart[itemId] * getCatalog[itemId].price;
    itemElem.classList.add("cart_total")
    itemElem.id ="cart_total_" + itemId;
    cartCountElem.appendChild(itemElem);
  } 
  }  else {
    console.log(cart[itemId]);
    console.log("cart_count_" + itemId);
    var itemElem = document.getElementById("cart_count_" + itemId);
    itemElem.innerHTML = cart[itemId];
    var itemElem = document.getElementById("cart_total_" + itemId);
    itemElem.innerHTML = cart[itemId] * getCatalog[itemId].price;
  }
  }
  
}

// Функция удаления товара с корзины

function deleteFromCart(itemId) {
  getCart[itemId] = 0;

  var cartCountElem = document.getElementById('cart');

  var itemElem = document.getElementById("cart_x_" + itemId);
  cartCountElem.removeChild(itemElem)

  var itemElem = document.getElementById("cart_img_" + itemId);
  cartCountElem.removeChild(itemElem)

  var itemElem = document.getElementById("cart_title_" + itemId);
  cartCountElem.removeChild(itemElem)

  var itemElem = document.getElementById("cart_price_" + itemId);
  cartCountElem.removeChild(itemElem)

  var itemElem = document.getElementById("cart_count_" + itemId);
  cartCountElem.removeChild(itemElem)

  var itemElem = document.getElementById("cart_total_" + itemId);
  cartCountElem.removeChild(itemElem)

}