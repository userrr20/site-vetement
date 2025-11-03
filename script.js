// --- Données produits (à remplacer par les tiens plus tard)
const products = [
  { id: 1, name: "Jean taille haute", category: "Jeans", price: 39, img: "https://via.placeholder.com/250x300?text=Jean" },
  { id: 2, name: "Pull rose doux", category: "Pulls", price: 29, img: "https://via.placeholder.com/250x300?text=Pull" },
  { id: 3, name: "Robe fleurie", category: "Robes", price: 45, img: "https://via.placeholder.com/250x300?text=Robe" },
  { id: 4, name: "Ensemble chic", category: "Ensembles", price: 55, img: "https://via.placeholder.com/250x300?text=Ensemble" },
];

// --- Navigation
const homeSection = document.getElementById("home");
const shopSection = document.getElementById("shop");
const productDetail = document.getElementById("product-detail");
const cartSection = document.getElementById("cart");

document.getElementById("nav-home").onclick = () => showSection(homeSection);
document.getElementById("nav-shop").onclick = () => showSection(shopSection);
document.getElementById("nav-cart").onclick = () => showSection(cartSection);
document.getElementById("shop-now").onclick = () => showSection(shopSection);

function showSection(section) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("active"));
  section.classList.add("active");
}

// --- Affichage boutique
const grid = document.getElementById("product-grid");
function displayProducts(list = products) {
  grid.innerHTML = "";
  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price} €</p>
      <button onclick="showProduct(${p.id})">Voir</button>
    `;
    grid.appendChild(div);
  });
}
displayProducts();

// --- Filtres et recherche
document.getElementById("filter-category").onchange = e => {
  const cat = e.target.value;
  if (cat === "all") displayProducts();
  else displayProducts(products.filter(p => p.category === cat));
};

document.getElementById("search").oninput = e => {
  const term = e.target.value.toLowerCase();
  displayProducts(products.filter(p => p.name.toLowerCase().includes(term)));
};

// --- Fiche produit
function showProduct(id) {
  const product = products.find(p => p.id === id);
  const container = document.querySelector("#product-detail .product-content");
  container.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.category}</p>
    <p class="price">${product.price} €</p>
    <button class="add-to-cart" onclick="addToCart(${product.id})">Ajouter au panier</button>
  `;
  showSection(productDetail);
}

document.querySelector(".back-btn").onclick = () => showSection(shopSection);

// --- Panier
let cart = [];

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  alert(`${product.name} ajouté au panier`);
}

function updateCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price} €</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">X</button>
    `;
    container.appendChild(div);
  });

  document.getElementById("cart-total").textContent = `Total : ${total} €`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

document.getElementById("nav-cart").onclick = () => {
  updateCart();
  showSection(cartSection);
};
