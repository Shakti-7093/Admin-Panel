import { Box, Button, Container, IconButton } from "@mui/material"
import { useNavigate } from "react-router-dom"
import EnteryPageNavbar from "./EnteryPageNavbar";
import dashboard from '../assets/img-dashboard.png';

function EntryPage() {
    const navigate = useNavigate();

    const handleRender = () => {
        navigate('/dashboard');
    }

    return (
        <>
            <EnteryPageNavbar />
            <Container style={{ minHeight: '80vh', width: '100%', marginTop: '70px' }}>
                <Box style={{ display: 'flex' }}>
                    <Box style={{ marginTop: '250px' }}>
                        <h1>Welcome to Dashboard</h1>
                        <p>We are here to monitor all the products, users, and aur client</p>
                        <IconButton onClick={handleRender}>
                            <Button variant="contained" color="primary">Go to Dashboard</Button>
                        </IconButton>
                    </Box>
                    <img style={{ marginLeft: '380px', marginRight: '20px', width: '300px', marginTop: '50px' }} src={dashboard} alt="image" />
                </Box>
            </Container>
        </>
    )
}

export default EntryPage;