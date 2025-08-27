// Save cart
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  // 🔔 notify other pages
  window.dispatchEvent(new Event("storage"));
}

// Load cart
function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// Add product
function addToCart(product) {
  let cart = getCart();
  let existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  saveCart(cart);
}

// Remove product (by index)
function removeItem(index) {
  let cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart?.(); // only runs if renderCart() exists on that page
}

// Update badge
function updateCartCount() {
  let cart = getCart();
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    let count = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    if (count > 0) {
      cartCountElement.textContent = count;
      cartCountElement.style.display = "inline-block";
    } else {
      cartCountElement.style.display = "none";
    }
  }
}

// ✅ Listen for updates across pages
window.addEventListener("storage", function (event) {
  if (event.key === "cart" || event.type === "storage") {
    updateCartCount();
  }
});

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);
