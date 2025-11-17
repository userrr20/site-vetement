<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Boutique en ligne</title>
  <style>
    /* Ajoute des styles de base ici pour tes catégories et produits */
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    header {
      background-color: #333;
      color: white;
      padding: 10px;
      text-align: center;
    }
    nav a {
      color: white;
      margin: 0 15px;
      text-decoration: none;
    }
    section {
      display: none;
      padding: 20px;
    }
    section.active {
      display: block;
    }
    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .category {
      background-color: #fff;
      padding: 15px;
      width: calc(25% - 20px);
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .category h3 {
      margin-bottom: 10px;
    }
    .category a {
      text-decoration: none;
      color: #007bff;
      font-weight: bold;
    }
    .product-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .product {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 15px;
      width: calc(25% - 20px);
      text-align: center;
    }
    .product img {
      max-width: 100%;
      height: auto;
    }
    .cart-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>

  <header>
    <nav>
      <a href="#" id="nav-home">Accueil</a>
      <a href="#" id="nav-shop">Boutique</a>
      <a href="#" id="nav-cart">Panier</a>
    </nav>
  </header>

  <section id="home" class="active">
    <h2>Catégories</h2>
    <div class="categories">
      <div class="category"><h3>Jeans</h3><a href="#" onclick="filterByCategory('Jeans')">Voir</a></div>
      <div class="category"><h3>Robes</h3><a href="#" onclick="filterByCategory('Robes')">Voir</a></div>
      <div class="category"><h3>Pulls</h3><a href="#" onclick="filterByCategory('Pulls')">Voir</a></div>
      <div class="category"><h3>Ensembles</h3><a href="#" onclick="filterByCategory('Ensembles')">Voir</a></div>
      <div class="category"><h3>Chaussures</h3><a href="#" onclick="filterByCategory('Chaussures')">Voir</a></div>
      <div class="category"><h3>Bijoux</h3><a href="#" onclick="filterByCategory('Bijoux')">Voir</a></div>
      <div class="category"><h3>Pantalons</h3><a href="#" onclick="filterByCategory('Pantalons')">Voir</a></div>
      <div class="category"><h3>Manteaux</h3><a href="#" onclick="filterByCategory('Manteaux')">Voir</a></div>
    </div>
  </section>

  <section id="shop">
    <h2>Nos produits</h2>
    <div id="product-grid" class="product-grid"></div>
    <h3>Filtrer par catégorie</h3>
    <select id="filter-category">
      <option value="all">Toutes les catégories</option>
      <option value="Jeans">Jeans</option>
      <option value="Robes">Robes</option>
      <option value="Pulls">Pulls</option>
      <option value="Ensembles">Ensembles</option>
      <option value="Chaussures">Chaussures</option>
      <option value="Bijoux">Bijoux</option>
      <option value="Pantalons">Pantalons</option>
      <option value="Manteaux">Manteaux</option>
    </select>
    <input type="text" id="search" placeholder="Rechercher un produit...">
  </section>

  <section id="product-detail">
    <div class="product-content"></div>
    <button class="back-btn">Retour à la boutique</button>
  </section>

  <section id="cart">
    <h2>Mon panier</h2>
    <div id="cart-items"></div>
    <div id="cart-total">Total : 0 €</div>
  </section>

  <script>
    // --- Données produits
    const products = [
      { id: 1, name: "Jean taille haute", category: "Jeans", price: 39, img: "jeans.jpg" },
      { id: 2, name: "Pull rose doux", category: "Pulls", price: 29, img: "pull.jpg" },
      { id: 3, name: "Robe fleurie", category: "Robes", price: 45, img: "robe-longue-.jpg" },
      { id: 4, name: "Ensemble chic", category: "Ensembles", price: 55, img: "ensemble.jpg" },
      { id: 5, name: "Chaussures femme", category: "Chaussures", price: 80, img: "image_chaussures_site.webp" },
      { id: 6, name: "Bracelet en or", category: "Bijoux", price: 25, img: "bracelet_or.jpg" },
      { id: 7, name: "Pantalon fluide", category: "Pantalons", price: 49, img: "pantalon_fluide.jpg" },
      { id: 8, name: "Manteau d'hiver", category: "Manteaux", price: 95, img: "manteau_beige_long.webp" }
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

    // --- Filtre par catégorie
    document.getElementById("filter-category").onchange = e => {
      const cat = e.target.value;
      if (cat === "all") displayProducts();
      else displayProducts(products.filter(p => p.category === cat));
    };

    // --- Recherche
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
        <button class="add-to-cart" onclick="addToCart(${product.id})">Ajouter
