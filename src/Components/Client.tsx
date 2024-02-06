import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField, Dialog, TableContainer, Table, TableHead, TableRow, TableCell, IconButton, TableBody, Paper } from "@mui/material";
import { fetchClient, addClient, updateClient, deleteClient } from "../Store/functions/Client";
import { AppDispatch, RootState } from "../Store/Store";
import { ClientInterface } from "../Store/Interface/ClientInterface";
import Sidebar from "./Sidebar";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Client: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clients = useSelector((state: RootState) => state.client.clients);
    const [open, setOpen] = useState(false);
    const [openTable, setOpenTable] = useState(false);

    const [newClient, setNewClient] = useState({
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

    const [selectedClient, setSelectedClient] = useState<ClientInterface | null>(null);

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
        setOpen(false);
    };

    const handleUpdateClient = () => {
        if (selectedClient) {
            dispatch(updateClient({ ...selectedClient, ...newClient }));
            setSelectedClient(null);
            setNewClient({
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
            setOpen(false);
        }
    };

    const handleDeleteClient = (clientId: number) => {
        dispatch(deleteClient(clientId));
    };

    const handleEditClick = (client: ClientInterface) => {
        setOpen(true)
        setSelectedClient(client);
        setNewClient({ ...client });
    };

    const handleCancelEdit = () => {
        setSelectedClient(null);
        setNewClient({
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
        setOpen(false);
    };

    return (
        <>
            <Sidebar />
            <div className="container">
                <h2>Clients</h2>
                <Button onClick={() => setOpen(true)}>Add Client</Button>
                <TableContainer component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', width: '100%' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='borderRight'>
                                    <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpenTable(!openTable)}
                                    >
                                        {openTable ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                                    </IconButton>
                                </TableCell>
                                <TableCell className='borderRight'>Name</TableCell>
                                <TableCell className='borderRight'>Email</TableCell>
                                <TableCell className='borderRight'>Phone</TableCell>
                                <TableCell className='borderRight'>Website</TableCell>
                                <TableCell className='borderRight'>Address</TableCell>
                                <TableCell className='borderRight'>Zip Code</TableCell>
                                <TableCell className='borderRight'>Country</TableCell>
                                <TableCell className='borderRight'>Edit</TableCell>
                                <TableCell className='borderRight'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {openTable && clients.map((client) => {
                                return (
                                    <TableRow key={client.id}>
                                        <TableCell></TableCell>
                                        <TableCell className='borderRight'>{client.name}</TableCell>
                                        <TableCell className='borderRight'>{client.email}</TableCell>
                                        <TableCell className='borderRight'>{client.phone}</TableCell>
                                        <TableCell className='borderRight'>{client.website}</TableCell>
                                        <TableCell className='borderRight'>{client.address.street + "," + client.address.area + "," + client.address.city + "," + client.address.state}</TableCell>
                                        <TableCell className='borderRight'>{client.address.zipcode}</TableCell>
                                        <TableCell className='borderRight'>{client.address.country}</TableCell>
                                        <TableCell className='borderRight'>
                                            <IconButton onClick={() => handleEditClick(client)}>
                                                <Button>Edit</Button>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell className='borderRight'>
                                            <IconButton onClick={() => handleDeleteClient(client.id)}>
                                                <Button>Delete</Button>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
                    <h3 style={{ marginBottom: "20px", width: '50%', marginLeft: '35%' }}>{selectedClient ? "Edit Client" : "Add New Client"}</h3>
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
                    {selectedClient ? (
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