import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function Modal({ open, handleClose, product, edit }) {

  const [productId, setProductId] = useState(product.productId);
  const [productName, setProductName] = useState(product.productName);
  const [scrumMasterName, setScrumMasterName] = useState(product.scrumMasterName);
  const [productOwnerName, setProductOwnerName] = useState(product.productOwnerName);
  const [developers, setDevelopers] = useState(product.developers ? product.developers.join(', ') : '');
  const [startDate, setStartDate] = useState(product.startDate);
  const [methodology, setMethodology] = useState(product.methodology);
  const [location, setLocation] = useState(product.location);
  const [showError, setShowError] = useState(false);

  const updatedProduct = { productId, productName, scrumMasterName, productOwnerName, developers: developers.split(',').map((developer) => developer.trim()), startDate, methodology, location };

  useEffect(() => {
    setProductId(product.productId);
    setProductName(product.productName);
    setScrumMasterName(product.scrumMasterName);
    setProductOwnerName(product.productOwnerName);
    setDevelopers(product.developers ? product.developers.join(', ') : '');
    setStartDate(product.startDate);
    setMethodology(product.methodology);
    setLocation(product.location);
    setShowError(false);
  }, [product]);

  const onSave = () => {
    if (!productId || !productName || !scrumMasterName || !productOwnerName || !developers || !startDate || !methodology || !location) {
      setShowError(true);
      return;
    }

    if (edit) {
      fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => response.json())
        .then(() => {
          handleClose();
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    } else {
      fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      })
        .then((response) => response.json())
        .then(() => {
          handleClose();
        })
        .catch((error) => {
          console.error('Error adding product:', error);
        });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{edit ? "Edit" : "Add"} Product</DialogTitle>
      <DialogContent>
        <TextField
          name="productId"
          label="Product Id"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          fullWidth
          margin="normal"
          disabled
          required
        />
        <TextField
          name="productName"
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="scrumMasterName"
          label="Scrum Master Name"
          value={scrumMasterName}
          onChange={(e) => setScrumMasterName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="productOwnerName"
          label="Product Owner Name"
          value={productOwnerName}
          onChange={(e) => setProductOwnerName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="developers"
          label="Developers"
          value={developers}
          onChange={(e) => setDevelopers(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="startDate"
          label="Start Date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="methodology"
          label="Methodology"
          value={methodology}
          onChange={(e) => setMethodology(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          name="location"
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
      {showError && (
        <Dialog open={showError}>
          <DialogTitle>Message</DialogTitle>
          <DialogContent>
            Please enter all required fields.
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowError(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      )}
    </Dialog>
  );
}

export default Modal;
