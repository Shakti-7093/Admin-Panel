import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, IconButton, InputAdornment, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import ProductsFormDialog from './ProductsFormDialog';
import Sidebar from './Sidebar';
import { AppDispatch, RootState } from '../Store/Store';
import { deleteProduct, fetchProduct } from '../Store/functions/Product';
import { Search } from '@mui/icons-material';

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const products = useSelector((state: RootState) => state.product.products);
    const status = useSelector((state: RootState) => state.product.status);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<null | number>(null);
    const [formError, setFormError] = useState(false);
    const [deleteConformation, setDeleteConformation] = useState(false);
    const [editConformation, setEditConformation] = useState(false);
    const [add, setAdd] = useState(false);

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
        setFormError(false)
    };

    const handleDeleteProduct = (productId: number) => {
        dispatch(deleteProduct(productId));
        setDeleteConformation(true);
        setTimeout(() => {
            setDeleteConformation(false);
        }, 3000);
    };

    const handleEditProduct = (productId: number) => {
        setSelectedProduct(productId);
        setDialogOpen(true);
    };

    useEffect(() => {
        if (status === 'ideal') dispatch(fetchProduct());
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
                {deleteConformation && <Snackbar open={deleteConformation} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Deleted Product Successfully</Alert></Snackbar> || editConformation && <Snackbar open={editConformation} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Edited Product Successfully</Alert></Snackbar> || add && <Snackbar open={add} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Added Product Successfully</Alert></Snackbar>}
                <ProductsFormDialog open={dialogOpen} onClose={handleCloseDialog} product={selectedProduct ? products.find(p => p.id === selectedProduct) || null : null} setEditConformation={setEditConformation} setAdd={setAdd} />
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='borderRight'>Title</TableCell>
                                <TableCell className='borderRight'>Brand Name</TableCell>
                                <TableCell className='borderRight'>Category</TableCell>
                                <TableCell className='borderRight'>Product Description</TableCell>
                                <TableCell className='borderRight'>Rating</TableCell>
                                <TableCell className='borderRight'>Price</TableCell>
                                <TableCell className='borderRight'>Discount Percentage</TableCell>
                                <TableCell className='borderRight'>Total Price</TableCell>
                                <TableCell className='borderRight'>Edit</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.filter(
                                (product) =>
                                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                            ).map((product) => {
                                return (
                                    <TableRow key={product.id}>
                                        {/* <TableCell></TableCell> */}
                                        <TableCell className='borderRight'>{product.title}</TableCell>
                                        <TableCell className='borderRight'>{product.brand}</TableCell>
                                        <TableCell className='borderRight'>{product.category}</TableCell>
                                        <TableCell className='borderRight'>{product.description}</TableCell>
                                        <TableCell className='borderRight'>{product.rating}</TableCell>
                                        <TableCell className='borderRight'>{product.price}</TableCell>
                                        <TableCell className='borderRight'>{product.discountPercentage + "%"}</TableCell>
                                        <TableCell className='borderRight'>{Math.round(product.price - ((product.price * product.discountPercentage)/100))}</TableCell>
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