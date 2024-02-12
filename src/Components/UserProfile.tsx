import Sidebar from './Sidebar'
import { useUser } from '../Context/Context';
import avatar from '../assets/456322.webp';
import { Grid } from '@mui/material';

function ProfilePage() {

    const { image } = useUser();
    const username = localStorage.getItem('username');
    const address = localStorage.getItem('address');
    const contact = localStorage.getItem('contact');

    return (
        <>
            <Sidebar />
            <div className='container'>
                <div className='setting-box'>
                    <div className="img-box" style={{ marginTop: '-50px', marginBottom: '35px' }}>
                        <img src={image ? URL.createObjectURL(image) : avatar} style={{ marginLeft: '25px', width: '200px', borderRadius: '50%' }} alt="" />
                    </div>
                    <h1>{username ? username : 'username'}</h1>
                    <Grid style={{ display: 'grid', gridTemplateColumns: "repeat(2,1fr)", gap: '30px', marginTop: '20px', marginLeft: '300px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2>Address :</h2>
                            <h4 style={{ marginLeft: '25px' }}>{address ? address : "User's Address"}</h4>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2>Contact :</h2>
                            <h4 style={{ marginLeft: '25px' }}>{contact ? contact : "User's Contact Number"}</h4>
                        </div>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;