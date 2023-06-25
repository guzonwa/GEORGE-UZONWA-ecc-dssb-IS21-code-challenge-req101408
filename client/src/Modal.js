import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';

function Modal({ open, handleClose, product, edit }) {

    const [productId, setProductId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [scrumMasterName, setScrumMasterName] = useState(product.scrumMasterName);
    const [productOwnerName, setProductOwnerName] = useState(product.productOwnerName);
    const [developers, setDevelopers] = useState(product.developers);
    const [startDate, setStartDate] = useState(product.startDate);
    const [methodology, setMethodology] = useState(product.methodology);
    const [location, setLocation] = useState(product.location);
    
    const updatedProduct = {productId, productName, scrumMasterName, productOwnerName, developers, startDate, methodology, location};
  
    useEffect(() => {
      setProductName(product.productName);
      setScrumMasterName(product.scrumMasterName);
      setProductOwnerName(product.productOwnerName);
      setDevelopers(product.developers);
      setStartDate(product.startDate);
      setMethodology(product.methodology);
      setLocation(product.location);
    }, [product]);

    const onSave = () => {
      // Handle save logic here if add then POST if edit then PUT 
      // PUT logic here to update the product using the product ID.
      console.log('Save edited product:', updatedProduct);
      handleClose();
    };
  
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{edit ? "Edit": "Add"} Product</DialogTitle>
        <DialogContent>
          {/* Input fields for editing the product */}
            {
            edit ? '' : 
              <TextField
              name="productId"
              label="Product Id"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              fullWidth
              margin="normal"
            />
          }
          <TextField
            name="productName"
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="scrumMasterName"
            label="Scrum Master Name"
            value={scrumMasterName}
            onChange={(e) => setScrumMasterName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="productOwnerName"
            label="Product Owner Name"
            value={productOwnerName}
            onChange={(e) => setProductOwnerName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="developers"
            label="Developers"
            value={developers}
            onChange={(e) => setDevelopers(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="startDate"
            label="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="methodology"
            label="Methodology"
            value={methodology}
            onChange={(e) => setMethodology(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            name="location"
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default Modal;
  