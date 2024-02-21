import { useNavigate } from 'react-router-dom';
import { useUser } from '../Context/Context'
import Sidebar from './Sidebar'
import { Box, Button } from '@mui/material';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

function ProductDetails() {
    const { productData } = useUser();
    const navigate = useNavigate();
    if (!productData) {
        navigate('/products')
    }
    const handleGoBack = () => {
        navigate('/products')
    }
    return (
        <>
            <Sidebar />
            <div className='container'>
                <h1>Product Details</h1>
                <div className='product-details'>
                    <h2 style={{ marginTop: '20px', marginBottom: '20px' }}>{productData?.title}</h2>
                    <div className="product-description">
                        <h3 style={{ marginBottom: '25px' }}>Product Description</h3>
                        <Box sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
                            <p>{productData?.description}</p>
                        </Box>
                    </div>
                    <div className='product-details-info'>
                        <p>Price: {productData?.price}</p>
                        <p>Rating: {productData?.rating}</p>
                        <p>Stock: {productData?.stock}</p>
                        <p>Brand: {productData?.brand}</p>
                        <p>Category: {productData?.category}</p>
                        <p>Discount: {productData?.discountPercentage}</p>
                    </div>
                </div>
                <Button variant="contained" color="primary" className='add-button-second' onClick={handleGoBack}>Back To Products<IoArrowBackCircleOutline style={{ fontSize: '25px', marginLeft: '10px' }} /></Button>
            </div>
        </>
    )
}

export default ProductDetails
