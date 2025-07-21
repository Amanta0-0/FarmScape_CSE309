const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');

let products = JSON.parse(localStorage.getItem('products')) || [];

// Helper: Render products list with optional filter
function renderProducts(filter = '') {
  productList.innerHTML = '';

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.category.toLowerCase().includes(filter.toLowerCase()) ||
    p.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (filtered.length === 0) {
    productList.innerHTML = '<p>No products found.</p>';
    return;
  }

  filtered.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';

    const imgSrc = product.imageData ? product.imageData : 'placeholder.png';

    productCard.innerHTML = `
      <img src="${imgSrc}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p><strong>Category:</strong> ${product.category}</p>
      <p>${product.description || ''}</p>
      <p><strong>Quantity:</strong> ${product.quantity} kg</p>
      <p class="price">Price: ৳${product.price.toFixed(2)} per kg</p>
      <button onclick="buyProduct(${product.id})">Buy</button>
    `;

    productList.appendChild(productCard);
  });
}

// Buy product button handler (simple alert for demo)
function buyProduct(id) {
  const product = products.find(p => p.id === id);
  if (product) {
    alert(`You selected to buy ${product.name}.\nContact seller to proceed.`);
  }
}

// Convert image file to base64 string for preview/storage
function readImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => resolve(e.target.result);
    reader.onerror = e => reject(e);
    reader.readAsDataURL(file);
  });
}

// Handle product form submit
productForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();
  const category = document.getElementById('productCategory').value;
  const quantity = parseFloat(document.getElementById('productQuantity').value);
  const price = parseFloat(document.getElementById('productPrice').value);
  const description = document.getElementById('productDescription').value.trim();
  const imageFile = document.getElementById('productImage').files[0];

  let imageData = '';

  if (imageFile) {
    try {
      imageData = await readImageFile(imageFile);
    } catch (error) {
      alert('Error reading image file.');
      return;
    }
  }

  const newProduct = {
    id: Date.now(),
    name,
    category,
    quantity,
    price,
    description,
    imageData
  };

  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));

  productForm.reset();
  renderProducts(searchInput.value);
});

// Search input handler
searchInput.addEventListener('input', () => {
  renderProducts(searchInput.value);
});

// Initial render
renderProducts();
