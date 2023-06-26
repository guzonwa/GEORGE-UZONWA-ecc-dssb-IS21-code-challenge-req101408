import './App.css';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';

function App() {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

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

  // const fetchProduct = (productId) => {
  //   fetch('/api/products/${productId}')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setProduct(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching product:', error);
  //     });
  // };

  const openDialog = (product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const addProduct = () => {
    setIsEdit(false);
    openDialog({});
  };
  
  const editProduct = (productId) => {
    const selected = products.find((product) => product.productId === productId);
    if (selected) {
      setIsEdit(true);
      openDialog(selected);
    }
  };
  
  const closeDialog = () => {
    fetchProducts();
    setSelectedProduct({});
    setDialogOpen(false); 
  };
  

  return (
    <div className="container">
      <h1 className="title">Products List</h1>
      <button className="add-product-button" onClick={addProduct}>
        <i className="fas fa-plus"></i> Add Product
      </button>
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
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.productName}</td>
              <td>{product.scrumMasterName}</td>
              <td>{product.productOwnerName}</td>
              <td>{product.developers ? product.developers.join(', ') : ''}</td>
              <td>{product.startDate}</td>
              <td>{product.methodology}</td>
              <td>
                <a href={product.location} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </td>
              <td>
                <button className="edit-button" onClick={() => editProduct(product.productId)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal open={isDialogOpen} handleClose={closeDialog} product={selectedProduct} edit={isEdit} />
    </div>
  );
}

export default App;