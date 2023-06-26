const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/health', (req, res) => {
  res.status(200).send('Component is healthy');
});

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

// add new product 
app.post('/api/products', (req, res) => {
  const newProduct = req.body;
  
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    let products = JSON.parse(data);
    products.push(newProduct);
    
    // overwrite the products json file
    fs.writeFile('products.json', JSON.stringify(products), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      
      res.status(200).json({ message: 'Product has been added' });
    });
  });
});

// Update a product
app.put('/api/products/:productId', (req, res) => {
  const productId = req.params.productId;
  const updatedProduct = req.body;

  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    let products = JSON.parse(data);
    const productIndex = products.findIndex(product => product.productId === productId);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found' });
    }

    products[productIndex] = { ...products[productIndex], ...updatedProduct };

    // Overwrite the products json file
    fs.writeFile('products.json', JSON.stringify(products), 'utf8', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(200).json({ message: 'Product has been updated' });
    });
  });
});


// Start server
app.listen(8000, () => {
    console.log('Server is running on port 8000'); 
});