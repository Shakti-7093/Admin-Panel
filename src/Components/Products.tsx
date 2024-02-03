import React, { useEffect, useState } from 'react';
import { Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import ProductFormDialog from './ProductsFormDialog';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../Store/Store';
import { deleteProduct, fetchProduct } from '../Store/Slice/ProductSlice';
import { KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material';

const Products: React.FC = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    const status = useSelector((state: RootState) => state.product.status);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        if (status === "ideal") {
            dispatch(fetchProduct())
        }
    });

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
    };

    return (
        <>
            <Sidebar />
            <div className='container'>
                <div className="search-flex">
                    <TextField
                        variant="outlined"
                        placeholder="Search..."
                        onChange={(e) => {
                            e.preventDefault()
                            setSearchTerm(e.target.value)
                        }}
                        style={{
                            marginTop: '-10px',
                            marginLeft: '-1%',
                            width: '40%'
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton aria-label="search" edge="start">
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <IconButton onClick={handleOpenDialog} color='primary' style={{ marginLeft: '500px', marginTop: '-10px' }}>
                        <Button variant="contained" color="primary">
                            Add Product
                        </Button>
                    </IconButton>
                </div>
                <ProductFormDialog open={dialogOpen} onClose={handleCloseDialog} />
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='borderRight'>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}
                                    >
                                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell className='borderRight'>Title</TableCell>
                                <TableCell className='borderRight'>Brand Name</TableCell>
                                <TableCell className='borderRight'>Category</TableCell>
                                <TableCell className='borderRight'>Description</TableCell>
                                <TableCell className='borderRight'>Price</TableCell>
                                <TableCell className='borderRight'>Discount Percentage</TableCell>
                                <TableCell className='borderRight'>Rating</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {open && products.filter(
                                (product) =>
                                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((product) => {
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell></TableCell>
                                        <TableCell className='borderRight'>{product.title}</TableCell>
                                        <TableCell className='borderRight'>{product.brand}</TableCell>
                                        <TableCell className='borderRight'>{product.category}</TableCell>
                                        <TableCell className='borderRight'>{product.description}</TableCell>
                                        <TableCell className='borderRight'>{product.price}</TableCell>
                                        <TableCell className='borderRight'>{product.discountPercentage + "%"}</TableCell>
                                        <TableCell className='borderRight'>{product.rating}</TableCell>
                                        <TableCell className='borderRight'>
                                            <Button onClick={() => handleDeleteProduct(product.id)} color="secondary">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default Products;