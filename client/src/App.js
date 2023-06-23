import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  const fetchProduct = (productId) => {
    fetch('/api/products/${productId}')
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.error('Error fetching product:', error);
      });
  };

  return (
    <div className="container">
      <h1 className="title">Product List</h1>
      <input
        type="text"
        placeholder="Filter by product id"
        value={product.productId}
        onChange={(e) => fetchProduct(e.target.value)}
        className="filter-input"
      />
      <table className="table">
        <thead>
          <tr>
            <th>Product Number</th>
            <th>Product Name</th>
            <th>Scrum Master</th>
            <th>Product Owner</th>
            <th>Developers</th>
            <th>Start Date</th>
            <th>Methodology</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.developers.join(', ')}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
                <a href={product.location} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;