const express = require('express');
const app = express();
const fs = require('fs');

// get all products
app.get('/api/products', (req, res) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const products = JSON.parse(data);
    res.json(products);
  });
});

// Get a single product by ID
app.get('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    const products = JSON.parse(data);
    const product = products.find((product) => product.productId === productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  });
});

// Start server
app.listen(8000, () => {
    console.log('Server is running on port 8000'); 
});