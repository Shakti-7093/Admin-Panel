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
  setEditConformation: (value:boolean) => void;
  setAdd: (value:boolean) => void;
}

const ProductsFormDialog: React.FC<ProductFormDialogProps> = ({ open, onClose, product, setEditConformation, setAdd }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(product);
  const [newProduct, setNewProduct] = useState<ProductInterface | null>(null);
  const [formError, setFormError] = useState(false);

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
    if (newProduct && newProduct.title && newProduct.description && newProduct.price && newProduct.rating && newProduct.stock && newProduct.brand && newProduct.category && newProduct.discountPercentage) {
      dispatch(addProduct(newProduct));
      onClose();
      setFormError(false)
      setAdd(true);
      setTimeout(() => {
          setAdd(false);
      }, 3000);
    } else {
      setFormError(true);
    }
  };

  const handleUpdateProduct = () => {
    if (newProduct) {
      dispatch(updateProduct(newProduct));
      onClose();
      setEditConformation(true);
      setTimeout(() => {
          setEditConformation(false);
      }, 3000);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent>
        {formError && <Alert severity="error">Please fill out all the required fields</Alert>}
        <TextField label="Title" style={{ marginTop: '5px' }} value={newProduct?.title} onChange={(e) => handleChange('title', e.target.value)} fullWidth required />
        <TextField label="Description" style={{ marginTop: '10px' }} value={newProduct?.description} onChange={(e) => handleChange('description', e.target.value)} fullWidth required />
        <TextField label="Rating" type="number" style={{ marginTop: '10px' }} value={newProduct?.rating} onChange={(e) => handleChange('rating', e.target.value)} fullWidth required />
        <TextField label="Price" style={{ marginTop: '10px' }} type="number" value={newProduct?.price} onChange={(e) => handleChange('price', e.target.value)} fullWidth required />
        <TextField label="Discount Percentage" style={{ marginTop: '10px' }} type="number" value={newProduct?.discountPercentage} onChange={(e) => handleChange('discountPercentage', e.target.value)} fullWidth required />
        <TextField label="Stock" type="number" style={{ marginTop: '10px' }} value={newProduct?.stock} onChange={(e) => handleChange('stock', e.target.value)} fullWidth required />
        <TextField label="Brand" style={{ marginTop: '10px' }} value={newProduct?.brand} onChange={(e) => handleChange('brand', e.target.value)} fullWidth required />

        <FormControl style={{ marginTop: '10px' }} fullWidth required >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={newProduct?.category}
            onChange={(e) => handleChange('category', e.target.value as string)}
          >
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Fragrances">Fragrances</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Home Decoration">Home Decoration</MenuItem>
            <MenuItem value="Laptops">Laptops</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
            <MenuItem value="Skincare">Skincare</MenuItem>
            <MenuItem value="Smartphones">Smartphones</MenuItem>
          </Select>
        </FormControl>
        {newProduct && newProduct.category === 'Other' && (<TextField label="Other Category" style={{ marginTop: '10px' }} value={newProduct?.other} onChange={(e) => handleChange('other', e.target.value)} fullWidth required />)}
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