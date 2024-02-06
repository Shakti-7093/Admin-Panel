import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl, Alert } from '@mui/material';
import { addProduct, updateProduct } from '../Store/functions/Product';
import { ProductInterface } from '../Store/Interface/ProductInterface';
import { AppDispatch } from '../Store/Store';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  product: ProductInterface | null;
}

function error() {
  return <Alert severity="error">Please fill all the fields</Alert>;
}

const ProductsFormDialog: React.FC<ProductFormDialogProps> = ({ open, onClose, product }) => {

  const dispatch = useDispatch<AppDispatch>();
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(product);
  const [newProduct, setNewProduct] = useState<ProductInterface | null>(null);

  useEffect(() => {
    setEditingProduct(product);
    setNewProduct(product ? { ...product } : null);
  }, [product]);

  const handleChange = (field: keyof ProductInterface, value: string) => {
    setNewProduct((prevProduct) => ({
      ...(prevProduct || {}),
      [field]: value,
    }));
  };

  const handleAddProduct = () => {
    if (newProduct) {
      dispatch(addProduct(newProduct));
      onClose();
    }
  };

  const handleUpdateProduct = () => {
    if (newProduct) {
      dispatch(updateProduct(newProduct));
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        <TextField label="Title" style={{ marginTop: '5px' }} value={newProduct?.title || ''} onChange={(e) => handleChange('title', e.target.value)} fullWidth />
        <TextField label="Description" style={{ marginTop: '10px' }} value={newProduct?.description || ''} onChange={(e) => handleChange('description', e.target.value)} fullWidth />
        <TextField label="Price" style={{ marginTop: '10px' }} type="number" value={newProduct?.price?.toString() || ''} onChange={(e) => handleChange('price', e.target.value)} fullWidth />
        <TextField label="Discount Percentage" style={{ marginTop: '10px' }} type="number" value={newProduct?.discountPercentage?.toString() || ''} onChange={(e) => handleChange('discountPercentage', e.target.value)} fullWidth />
        <TextField label="Rating" type="number" style={{ marginTop: '10px' }} value={newProduct?.rating?.toString() || ''} onChange={(e) => handleChange('rating', e.target.value)} fullWidth />
        <TextField label="Stock" type="number" style={{ marginTop: '10px' }} value={newProduct?.stock?.toString() || ''} onChange={(e) => handleChange('stock', e.target.value)} fullWidth />
        <TextField label="Brand" style={{ marginTop: '10px' }} value={newProduct?.brand || ''} onChange={(e) => handleChange('brand', e.target.value)} fullWidth />

        <FormControl style={{ marginTop: '10px' }} fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={newProduct?.category || ''}
            onChange={(e) => handleChange('category', e.target.value as string)}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Skincare">Skincare</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Fragrances">Fragrances</MenuItem>
            <MenuItem value="Smartphones">Smartphones</MenuItem>
            <MenuItem value="Laptops">Laptops</MenuItem>
            <MenuItem value="Home Decoration">Home Decoration</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        {editingProduct ? (
          <Button onClick={handleUpdateProduct} color="primary">
            Update Product
          </Button>
        ) : (
          <Button onClick={handleAddProduct} color="primary">
            Add Product
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductsFormDialog;