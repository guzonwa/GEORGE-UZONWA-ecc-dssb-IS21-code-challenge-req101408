import './App.css';
import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import DeleteIcon from '@mui/icons-material/Delete';

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

  const deleteProduct = (productId) => {
    fetch(`/api/products/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Product deleted:', data);
        fetchProducts();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
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

  function getNextId(currentId) {
    const currentNumber = parseInt(currentId.slice(1), 10);
    const nextNumber = currentNumber + 1;
    const paddedNumber = String(nextNumber).padStart(3, '0');
    const nextId = `P${paddedNumber}`;
    return nextId;
  }

  const addProduct = () => {
    const lastProductId = products[products.length - 1].productId;
    const nextProductid = getNextId(lastProductId);
    setIsEdit(false);
    openDialog({productId: nextProductid});
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

  const totalProducts = products.length;

  return (
    <div className="container">
      <h1 className="title">Products List</h1>
      <div className="total-products">Total Products: {totalProducts}</div>
      <button className="add-product-button" onClick={addProduct}>
        Add Product
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
            <th></th>
            <th></th>
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
              <td>
                <button className="delete-button" onClick={() => deleteProduct(product.productId)}>
                  <DeleteIcon />
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