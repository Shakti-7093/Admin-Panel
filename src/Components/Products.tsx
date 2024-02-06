import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import ProductsFormDialog from './ProductsFormDialog';
import Sidebar from './Sidebar';
import { AppDispatch, RootState } from '../Store/Store';
import { deleteProduct, fetchProduct } from '../Store/functions/Product';
import { KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material';

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    const status = useSelector((state: RootState) => state.product.status);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<null | number>(null);
    const [openTable, setOpenTable] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
    };

    const handleEditProduct = (productId: number) => {
        setSelectedProduct(productId);
        setDialogOpen(true);
    };

    useEffect(() => {
        if(status === 'ideal') dispatch(fetchProduct());
    }, [dispatch, status]);

    return (
        <>
            <Sidebar />
            <div className="container">
                <div className="search-flex">
                    <TextField
                        className='search'
                        variant="outlined"
                        placeholder="Search..."
                        onChange={(e) => {
                            e.preventDefault()
                            setSearchTerm(e.target.value)
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
                    <Button className='add-button' variant="contained" color="primary" onClick={handleOpenDialog}>
                        Add Product
                    </Button>
                </div>
                <ProductsFormDialog open={dialogOpen} onClose={handleCloseDialog} product={selectedProduct ? products.find(p => p.id === selectedProduct) || null : null} />
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpenTable(!openTable)}
                                    >
                                        {openTable ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell className='borderRight'>Title</TableCell>
                                <TableCell className='borderRight'>Brand Name</TableCell>
                                <TableCell className='borderRight'>Category</TableCell>
                                <TableCell className='borderRight'>Description</TableCell>
                                <TableCell className='borderRight'>Price</TableCell>
                                <TableCell className='borderRight'>Discount Percentage</TableCell>
                                <TableCell className='borderRight'>Rating</TableCell>
                                <TableCell className='borderRight'>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {openTable && products.filter(
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
                                            <Button onClick={() => handleEditProduct(product.id)} color="primary">
                                                Edit
                                            </Button>
                                        </TableCell>
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