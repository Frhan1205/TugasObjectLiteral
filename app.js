// Script untuk mengontrol modal
let cartModal = document.getElementById("cartModal");
let cartButton = document.getElementById("cartButton");
let closeBtn = document.getElementsByClassName("close")[0];

cartButton.onclick = function() {
  cartModal.style.display = "block";
  displayCart();  // Tampilkan isi keranjang di dalam modal
}

closeBtn.onclick = function() {
  cartModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == cartModal) {
    cartModal.style.display = "none";
  }
}

// Sisanya adalah script yang sudah ada untuk display produk dan keranjang
let Store = {
  carts: [],
  products: [
    { id: 1, name: "Jaket varsity", price: 150000, quantity: 1 },
    { id: 2, name: "Celana Cargo", price: 50000, quantity: 1 },
    { id: 3, name: "Celana Jeans", price: 55000, quantity: 1 },
    { id: 4, name: "Jam Tangan", price: 40000, quantity: 1 },
    { id: 5, name: "Kaos Kaki", price: 10000, quantity: 1 },
  ],

  addToCart(id, quantity) {
    let product = this.products.find((product) => product.id === id);
    let cartItem = this.carts.find((item) => item.id === id);

    if (cartItem) {
      // Jika produk sudah ada di keranjang, update jumlahnya
      cartItem.quantity += parseInt(quantity);
      cartItem.price = product.price * cartItem.quantity;
    } else {
      // Jika produk belum ada di keranjang, tambahkan sebagai item baru
      this.carts.push({
        id: product.id,
        name: product.name,
        price: product.price * quantity,
        quantity: parseInt(quantity),
      });
    }

    console.log("Menambahkan " + product.name + " ke keranjang");
    console.log(this.carts);
    displayCart();
  },

  removeProductFromCart(id) {
    this.carts = this.carts.filter((item) => item.id !== id);
    displayCart();
  },
};

function increaseQuantity(id) {
  let product = Store.products.find((product) => product.id === id);
  product.quantity++;
  document.getElementById(id).innerHTML = product.quantity;
}

function decreaseQuantity(id) {
  let product = Store.products.find((product) => product.id === id);
  if (product.quantity > 1) {
    product.quantity--;
  }
  document.getElementById(id).innerHTML = product.quantity;
}

function displayProducts() {
  const product = document.querySelector(".products");
  product.innerHTML = ""; // Reset produk sebelum menampilkannya kembali
  Store.products.forEach((item) => {
    const cardProduct = document.createElement("div");
    cardProduct.classList.add("card");
    cardProduct.innerHTML = `
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">Rp. ${item.price}</p>
        <button onClick="decreaseQuantity(${item.id})">-</button>
        <span id=${item.id}>${item.quantity}</span>
        <button onClick="increaseQuantity(${item.id})">+</button>
        <button onClick="Store.addToCart(${item.id}, document.getElementById(${item.id}).innerHTML)">Masukkan ke keranjang</button>      
    `;
    product.appendChild(cardProduct);
  });
}

function displayCart() {
  let carts = document.querySelector(".keranjang");
  carts.innerHTML = ""; // Kosongkan elemen keranjang sebelum mengisi ulang
  Store.carts.forEach((item) => {
    const cardCarts = document.createElement("div");
    cardCarts.classList.add("card");
    cardCarts.innerHTML = `
        <h5 class="card-title">${item.name}</h5>
        <p class="card-text">Rp. ${item.price}</p>
        <p class="card-text">Jumlah: ${item.quantity}</p>
        <button onClick="Store.removeProductFromCart(${item.id})">Hapus dari keranjang</button>
    `;
    carts.appendChild(cardCarts);
  });
}

displayProducts();
