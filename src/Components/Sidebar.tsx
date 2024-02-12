import React from 'react';
import { AppBar, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Cancel, Dashboard, Logout, Settings, VerifiedUserRounded } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import avatar from '../assets/456322.webp';
import { useUser } from '../Context/Context';
import { MdProductionQuantityLimits } from 'react-icons/md';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const { image } = useUser();

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const value = localStorage.getItem('email');

  const logout = () => {
    localStorage.removeItem('email');
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleToggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={open} onClose={handleToggleDrawer} style={{ background: 'transparent' }}>
              <IconButton className='cancel' style={{ width: '50px', marginLeft: '175px', boxShadow: 'none' }} onClick={handleToggleDrawer}>
                <Cancel style={{ cursor: 'pointer' }} />
              </IconButton>
              <List>
                <Link to='/dashboard'>
                  <ListItem key="Dashboard">
                    <ListItemIcon><Dashboard /></ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                </Link>
                <Link to='/client'>
                  <ListItem key="Client">
                    <ListItemIcon><VerifiedUserRounded /></ListItemIcon>
                    <ListItemText primary="Clients" />
                  </ListItem>
                </Link>
                <Link to='/products'>
                  <ListItem key="Products">
                    <ListItemIcon sx={{ fontSize: '30px' }}><MdProductionQuantityLimits /></ListItemIcon>
                    <ListItemText primary="Products" />
                  </ListItem>
                </Link>
                <Link to='/settings'>
                  <ListItem key="Settings">
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </Link>
                <ListItem key="Logout" onClick={logout} style={{ cursor: 'pointer' }}>
                  {
                    value ? (
                      <ListItemIcon>
                        <Logout sx={{ cursor: 'pointer' }} onClick={logout} />
                      </ListItemIcon>
                    ) : ""
                  }
                </ListItem>
              </List>
            </Drawer>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              Admin
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to='/dashboard' style={{ color: 'white' }}>Dashboard</Link>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to='/products' style={{ color: 'white' }}>Products</Link>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 8, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to='/client' style={{ color: 'white' }}>Clients</Link>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              <Link to='/profile' style={{ color: 'white' }}>
                <img style={{ width: '50px', borderRadius: '50%', marginTop: '7px', marginLeft: '0' }} src={image ? URL.createObjectURL(image) : avatar} alt="" />
              </Link>
            </Typography>
            <Typography
              variant="h6"
              noWrap
              component="div"
              onClick={() => navigate('/settings')}
              sx={{ flexGrow: 0.5, display: { xs: 'none', sm: 'block' } }}
            >
              <Settings sx={{ cursor: 'pointer' }} />
            </Typography>
            {
              value ? (
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 0, display: { xs: 'none', sm: 'block' } }}
                >
                  <Logout sx={{ cursor: 'pointer' }} onClick={logout} />
                </Typography>
              ) : ""
            }
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Sidebar;