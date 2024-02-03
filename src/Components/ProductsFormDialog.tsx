import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { addProduct } from '../Store/Slice/ProductSlice';
import { ProductInterface } from '../Store/Interface/ProductInterface';
import { RootState } from '../Store/Store';
import { ClientInterface } from '../Store/Interface/ClientInterface';

interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  client: ClientInterface[]
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const [product, setProduct] = useState<ProductInterface>({
    id: 0,
    title: '',
    description: '',
    price: 0,
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    brand: '',
    category: '',
  });

  const handleChange = (field: keyof ProductInterface, value: string) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      [field]: value,
    }));
  };

  const handleAddProduct = () => {
    const maxId = products.reduce((max, productx) => (productx.id > max ? productx.id : max), 0);
    console.log('Max ID:', maxId);
    // Set the id for the new product (assuming you have a mechanism to generate unique IDs)
    const newProduct: ProductInterface = {
      ...product,
      id: maxId + 1,
    };

    console.log('New Product:', newProduct);

    dispatch(addProduct(newProduct)).then(() => {
      setProduct({
        id: 0,
        title: '',
        description: '',
        price: 0,
        discountPercentage: 0,
        rating: 0,
        stock: 0,
        brand: '',
        category: '',
      });
      onClose();
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <TextField label="Title" style={{ marginTop: '5px' }} value={product.title} onChange={(e) => handleChange('title', e.target.value)} fullWidth />
        <TextField label="Description" style={{ marginTop: '10px' }} value={product.description} onChange={(e) => handleChange('description', e.target.value)} fullWidth />
        <TextField label="Price" style={{ marginTop: '10px' }} type="number" value={product.price.toString()} onChange={(e) => handleChange('price', e.target.value)} fullWidth />
        <TextField label="Discount Percentage" style={{ marginTop: '10px' }} type="number" value={product.discountPercentage} onChange={(e) => handleChange('discountPercentage', e.target.value)} fullWidth />
        <TextField label="Rating" type="number" style={{ marginTop: '10px' }} value={product.rating} onChange={(e) => handleChange('rating', e.target.value)} fullWidth />
        <TextField label="Stock" type="number" style={{ marginTop: '10px' }} value={product.stock} onChange={(e) => handleChange('stock', e.target.value)} fullWidth />
        <TextField label="Brand" style={{ marginTop: '10px' }} value={product.brand} onChange={(e) => handleChange('brand', e.target.value)} fullWidth />

        <FormControl style={{ marginTop: '10px' }} fullWidth>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            value={product.category}
            onChange={(e) => handleChange('category', e.target.value as string)}
          >
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddProduct} color="primary">
          Add Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;