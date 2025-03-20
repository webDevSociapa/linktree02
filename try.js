const axios = require('axios');

const shopifyStore = '04edda609d16a0c88dd1eba37a1f7f9e';
const accessToken = '••••••••••••••••••••••••••••••••••••••';

async function fetchProducts() {
  try {
    const response = await axios.get(`https://${shopifyStore}/admin/api/2024-01/products.json`, {
      headers: {
        'X-Shopify-Access-Token': accessToken,
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
  }
}

fetchProducts();
