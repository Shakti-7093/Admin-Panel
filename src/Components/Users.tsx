import * as React from 'react';
import Paper from '@mui/material/Paper';
import { AppDispatch, RootState } from '../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { fetchUser } from '../Store/Slice/UserSlice';

function Users() {

    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.user.users);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch])

    return (
        <TableContainer component={Paper} style={open === true ? { height: '50vh', boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px' } : { boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='borderRight'>
                            <IconButton
                                aria-label="expand row"
                                size="small"
                                onClick={() => setOpen(!open)}
                            >
                                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                            </IconButton>
                        </TableCell>
                        <TableCell className='borderRight'>Name</TableCell>
                        <TableCell className='borderRight'>Email</TableCell>
                        <TableCell className='borderRight'>Phone</TableCell>
                        <TableCell className='borderRight'>Website</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {open && users.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell></TableCell>
                                <TableCell className='borderRight'>{user.name}</TableCell>
                                <TableCell className='borderRight'>{user.email}</TableCell>
                                <TableCell className='borderRight'>{user.phone}</TableCell>
                                <TableCell className='borderRight'>{user.website}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Users;