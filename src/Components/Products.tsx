import React, { SetStateAction, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, InputAdornment, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField } from '@mui/material';
import ProductsFormDialog from './ProductsFormDialog';
import Sidebar from './Sidebar';
import { AppDispatch, RootState } from '../Store/Store';
import { deleteProduct, fetchProduct } from '../Store/functions/Product';
import { Search } from '@mui/icons-material';
import { useUser } from '../Context/Context';
import { ProductInterface } from '../Store/Interface/ProductInterface';
import { useNavigate } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import RatingStars from './RatingStars';

const Products: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const products = useSelector((state: RootState) => state.product.products);
    const status = useSelector((state: RootState) => state.product.status);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<null | number>(null);
    const [formError, setFormError] = useState(false);
    const [deleteConformation, setDeleteConformation] = useState(false);
    const [editConformation, setEditConformation] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [expandedDescription, setExpandedDescription] = useState<number | null>(null);
    const [selectedProductView, setSelectedProductView] = useState<ProductInterface | null>(null);
    const [view, setView] = useState(false);

    const { setTotalProductPrice, setProductData } = useUser();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event: { preventDefault: () => void; }, newPage: React.SetStateAction<number>) => {
        event.preventDefault();
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: { target: { value: string | number }; }) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedProduct(null);
        setFormError(false)
    };

    const handleDeleteProduct = (productId: number) => {
        setSelectedProduct(productId);
        setDeleteConfirmationOpen(true);
    };

    const handleConfirmDelete = (selectedProduct: number) => {
        dispatch(deleteProduct(selectedProduct));
        setDeleteConfirmationOpen(false);
        setDeleteConformation(true);
        setTimeout(() => {
            setDeleteConformation(false);
        }, 3000);
        setSelectedProduct(null);
    };

    const handleCancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setSelectedProduct(null);
    };

    const handleEditProduct = (productId: number) => {
        setSelectedProduct(productId);
        setDialogOpen(true);
    };

    const handleView = (product: SetStateAction<ProductInterface | null>) => {
        setSelectedProductView(product);
        setProductData(product);
        setView(true);
        navigate('/product-details');
    }

    useEffect(() => {
        if (status === 'ideal') dispatch(fetchProduct());
    }, [dispatch, status]);

    const toggleDescription = (productId: number) => {
        if (expandedDescription === productId) {
            setExpandedDescription(null);
        } else {
            setExpandedDescription(productId);
        }
    };

    const descriptionToShow = selectedProductView ? (expandedDescription === selectedProductView.id ? selectedProductView.description : selectedProductView.description.substring(0, 50)) : '';

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
                {formError && <Snackbar open={formError} autoHideDuration={1}><Alert style={{ marginTop: '15px' }} variant='filled' severity='error'>Fill the Required Details</Alert></Snackbar>}
                {deleteConformation && <Snackbar open={deleteConformation} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Deleted Product Successfully</Alert></Snackbar> || editConformation && <Snackbar open={editConformation} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Edited Product Successfully</Alert></Snackbar> || add && <Snackbar open={add} autoHideDuration={3000}><Alert style={{ marginTop: '15px' }} variant='filled' severity="success">Added Product Successfully</Alert></Snackbar>}
                <ProductsFormDialog open={dialogOpen} onClose={handleCloseDialog} product={selectedProduct ? products.find(p => p.id === selectedProduct) || null : null} setEditConformation={setEditConformation} setAdd={setAdd} />
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Title</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Brand Name</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Category</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Rating</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Price</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Discount Percentage</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Total Price</TableCell>
                                <TableCell className='borderRight' sx={{ textAlign: "center" }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.filter(
                                (product: ProductInterface) =>
                                    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                    product.category.toLowerCase().includes(searchTerm.toLowerCase())
                            ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => {
                                const total = Math.round(product.price - ((product.price * product.discountPercentage) / 100));
                                setTotalProductPrice(total);
                                return (
                                    <TableRow key={product.id}>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{product.title}</TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{product.brand}</TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{product.category}</TableCell>
                                        <TableCell className="borderRight" sx={{ textAlign: 'center' }}>
                                            <RatingStars rating={product.rating} />
                                        </TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{product.price}</TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{product.discountPercentage + "%"}</TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>{total}</TableCell>
                                        <TableCell className='borderRight' sx={{ textAlign: "center" }}>
                                            <Button onClick={() => handleView(product)} color="primary">
                                                <GrView style={{ fontSize: '25px' }} />
                                            </Button>
                                            <Button onClick={() => handleEditProduct(product.id)} color="primary">
                                                <MdEdit style={{ fontSize: '25px' }} />
                                            </Button>
                                            <Button onClick={() => handleDeleteProduct(product.id)} color="error">
                                                <MdDelete style={{ fontSize: '25px' }} />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    component="div"
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
                        if (event !== null) {
                            handleChangePage(event, newPage);
                        } else {
                            handleChangePage({ preventDefault: () => { } }, newPage);
                        }
                    }}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                <Dialog
                    open={deleteConfirmationOpen}
                    onClose={handleCancelDelete}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" color="red">{"Delete Confirmation"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to delete this product?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="error">
                            Cancel
                        </Button>
                        <Button onClick={() => selectedProduct !== null && handleConfirmDelete(selectedProduct)} color="success" autoFocus>
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
                {selectedProductView &&
                    <Dialog open={view} onClose={() => setView(false)} fullWidth sx={{ textAlign: 'center' }}>
                        <DialogTitle sx={{ marginBottom: '20px' }} color="black">Product Details</DialogTitle>
                        <DialogContent>
                            <DialogContentText sx={{ marginBottom: '15px', display: 'flex', marginLeft: '20%', gap: '10px' }}>
                                <h4 className='dialog-text-color'>Product ID:</h4> {selectedProductView.id}
                            </DialogContentText>
                            <DialogContentText sx={{ marginBottom: '15px', display: 'flex', marginLeft: '20%', gap: '10px' }}>
                                <h4 className='dialog-text-color'>Product Name:</h4> {selectedProductView.title}
                            </DialogContentText>
                            <DialogContentText sx={{ marginBottom: '15px', display: 'flex', marginLeft: '20%', gap: '10px' }}>
                                <h4 className='dialog-text-color'>Product Category:</h4> {selectedProductView.category}
                            </DialogContentText>
                            <DialogContentText sx={{ marginBottom: '15px', display: 'flex', marginLeft: '20%', gap: '10px' }}>
                                <h4 className='dialog-text-color'>Product Brand:</h4> {selectedProductView.brand}
                            </DialogContentText>
                            <DialogContentText sx={{ marginBottom: '5px' }}>
                                <h4 className='dialog-text-color'>Product Description:</h4>
                                {descriptionToShow}
                                {selectedProductView.description.length > 50 && (
                                    <>
                                        {/* <br /> */}
                                        <Button style={{ marginLeft: '50%', marginRight: '0px', marginTop: '10px' }} onClick={() => toggleDescription(selectedProductView.id)}>
                                            {expandedDescription === selectedProductView.id ? 'Read Less' : 'Read More'}
                                        </Button>
                                    </>
                                )}
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                }
            </div>
        </>
    );
};

export default Products;