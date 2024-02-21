import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert } from '@mui/material';
import { addClient, updateClient } from '../Store/functions/Client';
import { AddressInterface, ClientInterface } from '../Store/Interface/ClientInterface';
import { AppDispatch } from '../Store/Store';

interface ClientFormDialogProps {
    open: boolean;
    onClose: () => void;
    client: ClientInterface | null;
    formError: boolean;
    setFormError: (value: boolean) => void;
}

const ClientFormDialog: React.FC<ClientFormDialogProps> = ({ open, onClose, client, formError, setFormError }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [editingClient, setEditingClient] = useState<ClientInterface | null>(client);
    const [newClient, setNewClient] = useState<ClientInterface | null>(null);

    useEffect(() => {
        setEditingClient(client);
        setNewClient(client ? { ...client } : null);
    }, [client]);

    const handleChange = (field: keyof ClientInterface, value: string) => {
        setNewClient((prevClient) => ({
            ...(prevClient || {}),
            [field]: value
        }));
    };

    const handleAddressChange = (field: keyof AddressInterface, value: string) => {
        setNewClient((prevClient) => {
            if (prevClient) {
                return {
                    ...prevClient,
                    address: {
                        ...prevClient?.address,
                        [field]: value,
                    },
                };
            }
            return null;
        });
    };

    const handleAddClient = (newClient: ClientInterface) => {
        if (!newClient || !newClient.name || !newClient.email || !newClient.phone || !newClient.website || !newClient?.address?.street || !newClient?.address?.area || !newClient?.address?.city || !newClient?.address?.state || !newClient?.address?.country || !newClient?.address?.zipcode) {
            setFormError(true);
            return;
        }
        dispatch(addClient(newClient));
        onClose();
    };

    const handleUpdateClient = () => {
        if (newClient) {
            dispatch(updateClient(newClient));
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
            <DialogContent>
                {formError && <Alert severity="error">Please fill out all the required fields</Alert>}
                <TextField label="Name" style={{ marginTop: '5px' }} value={newClient?.name || ''} onChange={(e) => handleChange('name', e.target.value)} fullWidth required />
                <TextField label="Email" style={{ marginTop: '10px' }} value={newClient?.email || ''} onChange={(e) => handleChange('email', e.target.value)} fullWidth required />
                <TextField label="(optional email)" style={{ marginTop: '10px' }} value={newClient?.secondemail || ''} onChange={(e) => handleChange('secondemail', e.target.value)} fullWidth />
                <TextField label="Phone" style={{ marginTop: '10px' }} value={newClient?.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} fullWidth required />
                <TextField label="Website" style={{ marginTop: '10px' }} value={newClient?.website || ''} onChange={(e) => handleChange('website', e.target.value)} fullWidth required />
                <TextField label="Street" style={{ marginTop: '10px' }} value={newClient?.address?.street || ''} onChange={(e) => handleAddressChange('street', e.target.value)} fullWidth required />
                <TextField label="Area" style={{ marginTop: '10px' }} value={newClient?.address?.area || ''} onChange={(e) => handleAddressChange('area', e.target.value)} fullWidth required />
                <TextField label="City" style={{ marginTop: '10px' }} value={newClient?.address?.city || ''} onChange={(e) => handleAddressChange('city', e.target.value)} fullWidth required />
                <TextField label="State" style={{ marginTop: '10px' }} value={newClient?.address?.state || ''} onChange={(e) => handleAddressChange('state', e.target.value)} fullWidth required />
                <TextField label="Country" style={{ marginTop: '10px' }} value={newClient?.address?.country || ''} onChange={(e) => handleAddressChange('country', e.target.value)} fullWidth required />
                <TextField label="Zipcode" style={{ marginTop: '10px' }} value={newClient?.address?.zipcode || ''} onChange={(e) => handleAddressChange('zipcode', e.target.value)} fullWidth required />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                {editingClient ? (
                    <Button onClick={handleUpdateClient} color="primary">
                        Update Client
                    </Button>
                ) : (
                    <Button onClick={() => { if (newClient) handleAddClient }} color="primary">
                        Add Client
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ClientFormDialog;
