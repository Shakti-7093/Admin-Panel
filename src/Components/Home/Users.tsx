import * as React from 'react';
import Paper from '@mui/material/Paper';
import { AppDispatch, RootState } from '../../Store/Store';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchUser } from '../../Store/Slice/UserSlice';

function Users() {

    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.user.users);

    React.useEffect(() => {
        dispatch(fetchUser())
    }, [dispatch]);

    return (
        <TableContainer className='scroll-none' component={Paper} style={{ boxShadow: '0px 0px 8px 0px gray', borderRadius: '10px', height: '60vh'}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='borderRight'>Name</TableCell>
                        <TableCell className='borderRight'>Email</TableCell>
                        <TableCell className='borderRight'>Phone</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => {
                        return (
                            <TableRow key={user.id}>
                                <TableCell className='borderRight'>{user.name}</TableCell>
                                <TableCell className='borderRight'>{user.email}</TableCell>
                                <TableCell className='borderRight'>{user.phone}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Users;