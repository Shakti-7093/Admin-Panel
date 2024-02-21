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
  setEditConformation: (value: boolean) => void;
  setAdd: (value: boolean) => void;
}

const ProductsFormDialog: React.FC<ProductFormDialogProps> = ({ open, onClose, product, setEditConformation, setAdd }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editingProduct, setEditingProduct] = useState<ProductInterface | null>(product);
  const [newProduct, setNewProduct] = useState<ProductInterface | null>(null);
  const [formError, setFormError] = useState(false);
  const [ratingError, setRatingError] = useState(false);

  useEffect(() => {
    if (product && !editingProduct) {
      setEditingProduct(product);
      setNewProduct({ ...product }); // Initialize newProduct with the provided product
    } else if (!product) {
      setEditingProduct(null);
      setNewProduct(null); // Reset newProduct when adding a new product
    }
  }, [product, editingProduct]);
  


  const handleChange = (field: keyof ProductInterface, value: string) => {
    if(field === 'category'){
      setNewProduct((prev) => ({
        ...prev!,
        [field]: value
      }));
    }else if (field === 'rating') {
      // Parse the value as a float
      const parsedValue = parseFloat(value);
      // Check if the parsed value is NaN or greater than 5
      if (isNaN(parsedValue) || parsedValue > 5) {
        setRatingError(true);
      } else {
        setRatingError(false);
        setNewProduct((prev) => ({
          ...prev!,
          [field]: parsedValue
        }));
      }
    } else{
      setNewProduct((prev) => ({
        ...prev!,
        [field]: value
      }));
    }
  };

  const handleAddProduct = (newProduct: ProductInterface) => {
    if (!newProduct.title || !newProduct.description || !newProduct.price || !newProduct.rating || !newProduct.stock || !newProduct.brand || !newProduct.category || !newProduct.discountPercentage) {
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 2000);
      console.log(newProduct)
    } else {
      dispatch(addProduct(newProduct));
      onClose();
      setFormError(false)
      setAdd(true);
      setTimeout(() => {
        setAdd(false);
      }, 3000);
      console.log(newProduct)
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
        {ratingError && <Alert severity="error">The Rating should be upto 5 only</Alert>}
        <TextField label="Title" style={{ marginTop: '5px' }} value={newProduct?.title} onChange={(e) => handleChange('title', e.target.value)} fullWidth required />
        <TextField label="Description" style={{ marginTop: '10px' }} value={newProduct?.description} onChange={(e) => handleChange('description', e.target.value)} fullWidth required />
        <TextField label="Rating" type="number" style={{ marginTop: '10px' }} value={newProduct?.rating} onChange={(e) => handleChange('rating', e.target.value)} fullWidth required />
        <TextField label="Price" style={{ marginTop: '10px' }} type="number" value={newProduct?.price} onChange={(e) => handleChange('price', e.target.value)} fullWidth required />
        <TextField label="Discount Percentage" style={{ marginTop: '10px' }} type="number" value={newProduct?.discountPercentage} onChange={(e) => handleChange('discountPercentage', e.target.value)} fullWidth required />
        <TextField label="Stock" type="number" style={{ marginTop: '10px' }} value={newProduct?.stock} onChange={(e) => handleChange('stock', e.target.value)} fullWidth required />
        <TextField label="Brand" style={{ marginTop: '10px' }} value={newProduct?.brand} onChange={(e) => handleChange('brand', e.target.value)} fullWidth required />

        <FormControl style={{ marginTop: '10px' }} fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={newProduct?.category || 'None'}
            onChange={(e) => handleChange('category', e.target.value)}
            required
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Fragrances">Fragrances</MenuItem>
            <MenuItem value="Groceries">Groceries</MenuItem>
            <MenuItem value="Home Decoration">Home Decoration</MenuItem>
            <MenuItem value="Laptops">Laptops</MenuItem>
            <MenuItem value="Skincare">Skincare</MenuItem>
            <MenuItem value="Smartphones">Smartphones</MenuItem>
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
          <Button onClick={() => { if (newProduct) handleAddProduct(newProduct) }} color="primary">
            Add Product
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProductsFormDialog;