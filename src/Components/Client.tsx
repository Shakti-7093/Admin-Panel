import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Dialog, TableContainer, Table, TableHead, TableRow, TableCell, IconButton, TableBody, Paper, Collapse, Typography } from "@mui/material";
import { fetchClient, addClient, updateClient, deleteClient } from "../Store/functions/Client";
import { AppDispatch, RootState } from "../Store/Store";
import { ClientInterface } from "../Store/Interface/ClientInterface";
import Sidebar from "./Sidebar";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Client: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.client.clients);
    // const [open, setOpen] = useState(false);
    const [expandedClientId, setExpandedClientId] = useState<number | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newClient, setNewClient] = useState<ClientInterface>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        website: "",
        address: {
            street: "",
            area: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
        },
    });

    useEffect(() => {
        dispatch(fetchClient());
    }, [dispatch]);

    const handleInputChange = (field: string, value: string) => {
        setNewClient((prevClient) => ({
            ...prevClient,
            [field]: value,
        }));
    };

    const handleAddressChange = (field: string, value: string) => {
        setNewClient((prevClient) => ({
            ...prevClient,
            address: {
                ...prevClient.address,
                [field]: value,
            },
        }));
    };

    const handleAddClient = () => {
        dispatch(addClient(newClient));
        setNewClient({
            id: 0,
            name: "",
            email: "",
            phone: "",
            website: "",
            address: {
                street: "",
                area: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
            },
        });
        setDialogOpen(false);
    };    

    const handleUpdateClient = () => {
        dispatch(updateClient(newClient));
        setNewClient({
            id: 0,
            name: "",
            email: "",
            phone: "",
            website: "",
            address: {
                street: "",
                area: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
            },
        });
        setDialogOpen(false);
    };

    const handleDeleteClient = (clientId: number) => {
        dispatch(deleteClient(clientId));
    };

    const handleEditClick = (client: ClientInterface) => {
        setNewClient(client);
        setDialogOpen(true);
    };

    const handleCancelEdit = () => {
        setNewClient({
            id: 0,
            name: "",
            email: "",
            phone: "",
            website: "",
            address: {
                street: "",
                area: "",
                city: "",
                state: "",
                country: "",
                zipcode: "",
            },
        });
        setDialogOpen(false);
    };

    const toggleClientDetails = (clientId: number) => {
        if (expandedClientId === clientId) {
            setExpandedClientId(null);
        } else {
            setExpandedClientId(clientId);
        }
    };

    return (
        <>
            <Sidebar />
            <div className="container">
                <h2>Clients</h2>
                <Button onClick={() => setDialogOpen(true)}>Add Client</Button>
                <TableContainer className="table" component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px' }}>
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
                            {clients.map((client) => (
                                <React.Fragment key={client.id}>
                                    <TableRow>
                                        <TableCell>
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => toggleClientDetails(client.id)}
                                            >
                                                {expandedClientId === client.id ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className='borderRight'>{client.name}</TableCell>
                                        <TableCell className='borderRight'>{client.email}</TableCell>
                                        <TableCell className='borderRight'>{client.phone}</TableCell>
                                        <TableCell className='borderRight'>
                                            <Button onClick={() => handleEditClick(client)}>Edit</Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeleteClient(client.id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
                                            <Collapse in={expandedClientId === client.id} timeout="auto" unmountOnExit>
                                                <Typography variant="body2" style={{ marginLeft: '20%' }}>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Website:</h4> {client.website}
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Address:</h4> {client.address.street}, {client.address.area}, {client.address.city}, {client.address.state}, {client.address.zipcode}<br />
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Zip Code:</h4> {client.address.zipcode}<br />
                                                    </div>
                                                    <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                                                        <h4>Country:</h4> {client.address.country}
                                                    </div>
                                                </Typography>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog fullWidth open={dialogOpen} onClose={() => setDialogOpen(false)}>
                    <h3 style={{ marginBottom: "20px", width: '50%', marginLeft: '35%' }}>{newClient.id ? "Edit Client" : "Add New Client"}</h3>
                    <TextField
                        label="Name"
                        value={newClient.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Email"
                        value={newClient.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Phone"
                        value={newClient.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Website"
                        value={newClient.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Street"
                        value={newClient.address.street}
                        onChange={(e) => handleAddressChange("street", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Area"
                        value={newClient.address.area}
                        onChange={(e) => handleAddressChange("area", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="City"
                        value={newClient.address.city}
                        onChange={(e) => handleAddressChange("city", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="State"
                        value={newClient.address.state}
                        onChange={(e) => handleAddressChange("state", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Country"
                        value={newClient.address.country}
                        onChange={(e) => handleAddressChange("country", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    <TextField
                        label="Zipcode"
                        value={newClient.address.zipcode}
                        onChange={(e) => handleAddressChange("zipcode", e.target.value)}
                        style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}
                    />
                    {newClient.id ? (
                        <div>
                            <Button onClick={handleCancelEdit} style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}>Cancel</Button>
                            <Button onClick={handleUpdateClient} style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}>Update</Button>
                        </div>
                    ) : (
                        <Button onClick={handleAddClient} style={{ marginBottom: "20px", width: '50%', marginLeft: '25%' }}>Add Client</Button>
                    )}
                </Dialog>
            </div>
        </>
    );
};

export default Client;