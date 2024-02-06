import { Box, Button, Card, IconButton, Typography } from '@mui/material'
import Sidebar from './Sidebar'
import { useUser } from '../Context/Context'
import { useEffect, useState } from 'react';

function UserProfile() {

    const { address, setAddress } = useUser();
    const [dialog, setDialog] = useState(false);
    const [user, setUser] = useState('');

    const email = localStorage.getItem('email');

    useEffect(() => {
        if (email === 'webkit7093@gmail.com') {
            setUser('Shakti Singh Chundawat')
        } else if (email === 'princethumar222@gmail.com') {
            setUser('Prince Thumar')
        } else {
            setUser('User Name')
        }
    }, [])

    return (
        <>
            <Sidebar />
            <div className='container'>
                <Box className='user-profile'>
                    <h1>User Profile</h1>
                    <Card sx={{ width: 500, height: 450, border: '1px solid black' }}>
                        <Typography variant="h5" component="div">
                            User Name: {user}
                        </Typography>
                        <Typography variant="body2">
                            Email: {email}
                        </Typography>
                        <Typography variant="body2">
                            Role: Admin
                        </Typography>
                        <Typography variant="body2">
                            Address: {address}
                        </Typography>
                        <IconButton>
                            <Button variant='outlined' color='primary' onClick={() => setDialog(true)}>Edit</Button>
                        </IconButton>
                    </Card>
                </Box>
            </div>
        </>
    )
}

export default UserProfile