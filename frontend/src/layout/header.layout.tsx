import React, { useContext, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import NehemiaLogo from '../assets/nehemia.webp';
import { Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { StateContext } from '../core/state';
import { filter } from 'rxjs';
import { BasicUser } from '../core/model/basic-user.model';


export const HeaderLayout: React.FC = (): React.ReactElement => {

    const { authServiceInstance } = useContext(StateContext);
    const [user, setUser] = useState<BasicUser | null>(null);

    useEffect(() => {
        authServiceInstance.user$.pipe(
            filter(user => !!user)
        ).subscribe(setUser);
    }, []);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);


    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose();
        authServiceInstance.logout().then(response => {
            console.log(response);
        });
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#616161' }}>
                    <Toolbar>
                        <div className='flex flex-row items-center justify-between w-full'>
                            <div className='flex flex-row items-center'>
                                <div>
                                    <Typography variant="h6" component="div">
                                        <Link to="/">
                                            <div className='flex flex-row items-center'>
                                                <img src={NehemiaLogo} alt='nehemia-logo-in-navbar' style={{ height: '50px' }} className='mr-3' />
                                                Learning Plattform
                                            </div>
                                        </Link>
                                    </Typography>
                                </div>
                                <div className='ml-9 flex flex-row items-center'>
                                    <Button color="inherit" variant="outlined">
                                        <Link to="/learning">
                                            Learning area
                                        </Link>
                                    </Button>
                                    <div className='ml-3'>
                                        <Button color="inherit" variant="outlined">
                                            <Link to="/admin">
                                                Admin area
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {user && (
                                    <>
                                        <Button
                                            size="large"
                                            aria-label="account of current user"
                                            aria-controls="menu-appbar"
                                            aria-haspopup="true"
                                            onClick={handleMenu}
                                            color="inherit"
                                            variant='outlined'
                                        >
                                            <AccountCircle />
                                            <div className='ml-3'>
                                                {user.username}
                                            </div>
                                        </Button>
                                        <Menu
                                            id="menu-appbar"
                                            anchorEl={anchorEl}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                        >
                                            <MenuItem disabled>Name: {user.firstName} {user.lastName}</MenuItem>
                                            <MenuItem disabled>Role: {user.appRole}</MenuItem>
                                            <MenuItem onClick={handleLogout}>Log off</MenuItem>
                                        </Menu>
                                    </>
                                )}
                            </div>
                        </div>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}