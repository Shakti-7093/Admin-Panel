import React, { useState } from 'react';
import {
    Switch,
    FormControlLabel,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@mui/material";
import { useUser } from '../../Context/Context';
import avatar from '../../assets/456322.webp';
import { Add } from '@mui/icons-material';
import axios from 'axios';

function Profile() {
    const { setUsername, showNotification, setShowNotification, image, setImage } = useUser();

    const username = localStorage.getItem('username');

    const [openDialog, setOpenDialog] = useState(false);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setShowNotification(event.target.checked);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0];
        setImage(selectedImage ?? null);
        axios.post('http://localhost:3000/images', selectedImage, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSaveSettings = () => {
        console.log("Image:", image);
        setOpenDialog(false);
    };

    return (
        <div className="setting-box-content">
            <div className="upload-image">
                <div className="img-box2">
                    <img src={image ? URL.createObjectURL(image) : avatar} style={{ marginLeft: '75px', width: '125px', position: 'relative', borderRadius: '50%' }} alt="" />
                    <div className="btn-circle">
                        <Button variant="contained" component='label' style={{ borderRadius: '50px', marginTop: '8px', marginLeft: '-163px' }}>
                            <Add />
                            <input type="file" hidden onChange={handleImageChange} />
                        </Button>
                    </div>
                </div>
            </div>
            <TextField
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <FormControlLabel
                control={<Switch checked={showNotification} value={showNotification} onChange={handleSwitchChange} />}
                label="Show Notifications"
            />
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Update
            </Button>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Notification</DialogTitle>
                <DialogContent>
                    {showNotification ? (
                        <p>You will receive notifications.</p>
                    ) : (
                        <p>Notifications are turned off.</p>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveSettings} color="primary">
                        Save
                    </Button>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Profile;