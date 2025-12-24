// Load Navbar in All Pages
document.addEventListener("DOMContentLoaded", async () => {
  const navbarContainer = document.createElement("div");
  document.body.insertBefore(navbarContainer, document.body.firstChild);

  try {
    const res = await fetch("navbar.html");
    const html = await res.text();
    navbarContainer.innerHTML = html;

    // بعد تحميل النافبار
    setupNavbar();
  } catch (err) {
    console.error("Error loading navbar:", err);
  }
});

// Setup navbar and cart
function setupNavbar() {
  updateCartCount();

  // عند الضغط على أيقونة السلة
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
}

// Update Cart Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("dokkankCart")) || [];
  const cartCount = document.getElementById("cart-count");
  if (cartCount) cartCount.textContent = cart.length;
}

// Add product to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("dokkankCart")) || [];
  cart.push(product);
  localStorage.setItem("dokkankCart", JSON.stringify(cart));
  updateCartCount();
  alert("✅ تم إضافة المنتج إلى السلة!");
}

// For product page image change
function changeProductImage(imageSrc) {
  const mainImage = document.getElementById("main-product-image");
  if (mainImage) mainImage.src = imageSrc;
}



// Go to another page
function goToPage(page) {
  window.location.href = page;
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("dokkankCart")) || [];
  const countElement = document.getElementById("cart-count");
  if (countElement) countElement.textContent = cart.length;
}

// Add item to cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("dokkankCart")) || [];
  cart.push(product);
  localStorage.setItem("dokkankCart", JSON.stringify(cart));
  updateCartCount();
  alert("✅ Added to cart!");
}

// When clicking cart icon → go to cart page
function setupCartIcon() {
  const cartIcon = document.getElementById("cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }
}

// Product page: change image when size clicked
function setupProductPage() {
  const sizeButtons = document.querySelectorAll(".size-option");
  const mainImage = document.getElementById("product-image");

  sizeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      sizeButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const newImage = btn.getAttribute("data-image");
      if (newImage && mainImage) {
        mainImage.src = newImage;
      }
    });
  });
}

// Cart page: display added items
function loadCartPage() {
  const cartContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("dokkankCart")) || [];

  if (!cartContainer) return;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>Size: ${item.size}</p>
        <p>Price: ${item.price}</p>
      </div>
    </div>
  `).join("");
}
