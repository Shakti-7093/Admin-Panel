import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Collapse, IconButton, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import ClientFormDialog from './ClientFormDialog';
import Sidebar from './Sidebar';
import { AppDispatch, RootState } from '../Store/Store';
import { deleteClient, fetchClient } from '../Store/functions/Client';
import { KeyboardArrowDown, KeyboardArrowUp, Search } from '@mui/icons-material';

const Clients: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.client.clients);
    const status = useSelector((state: RootState) => state.client.status);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClient, setSelectedClient] = useState<number | null>(null);
    const [expandedClients, setExpandedClients] = useState<number[]>([]);
    const [formError, setFormError] = useState(false)

    const handleOpenDialog = () => {
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedClient(null);
        setFormError(false);
    };

    const handleDeleteClient = (clientId: number) => {
        dispatch(deleteClient(clientId));
    };

    const handleEditClient = (clientId: number) => {
        setSelectedClient(clientId);
        setDialogOpen(true);
    };

    const toggleExpandedClient = (clientId: number) => {
        setExpandedClients((prevExpandedClients) => {
            if (prevExpandedClients.includes(clientId)) {
                return prevExpandedClients.filter((id) => id !== clientId);
            } else {
                return [...prevExpandedClients, clientId];
            }
        });
    };

    useEffect(() => {
        if (status === 'ideal') dispatch(fetchClient());
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
                        Add Client
                    </Button>
                </div>
                <ClientFormDialog open={dialogOpen} onClose={handleCloseDialog} formError={formError} setFormError={setFormError} client={selectedClient ? clients.find(c => c.id === selectedClient) || null : null} />
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', marginTop: '20px', display: 'flex' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell className='borderRight'>Name</TableCell>
                                <TableCell className='borderRight'>Email</TableCell>
                                <TableCell className='borderRight'>Phone</TableCell>
                                <TableCell className='borderRight'>Edit</TableCell>
                                <TableCell className='borderRight'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.filter(client => client.name.toLowerCase().includes(searchTerm.toLowerCase())).map((client) => (
                                <React.Fragment key={client.id}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => toggleExpandedClient(client.id)}
                                            >
                                                {expandedClients.includes(client.id) ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className='borderRight'>{client.name}</TableCell>
                                        <TableCell className='borderRight'>{client.email}</TableCell>
                                        <TableCell className='borderRight'>{client.phone}</TableCell>
                                        <TableCell className='borderRight'>
                                            <Button onClick={() => handleEditClient(client.id)} color="primary">
                                                Edit
                                            </Button>
                                        </TableCell>
                                        <TableCell className='borderRight'>
                                            <Button onClick={() => handleDeleteClient(client.id)} color="secondary">
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                            <Collapse in={expandedClients.includes(client.id)} timeout="auto" unmountOnExit>
                                                <Typography variant="body2" style={{ marginLeft: '20%' }}>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Website:</h4> {client.website}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Address:</h4> {client.address.street}, {client.address.area}, {client.address.city}, {client.address.state}, {client.address.zipcode}<br />
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Phone:</h4> {client.phone}
                                                    </div>
                                                    {/* Add other details as needed */}
                                                </Typography>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default Clients;