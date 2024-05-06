import React from 'react';

import './admin-home.component.css';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material';

import { Link, Outlet } from 'react-router-dom';

export const AdminHomeComponent: React.FC = (): React.ReactElement => {

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 300,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/admin/learnset-overview'>
                                <ListItemText primary="Learnsets" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/admin/learnsettype-overview'>
                                <ListItemText primary="Learnset Types" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to='/admin/users'>
                                <ListItemText primary="Users" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Outlet />
                </Box>
            </Box>
        </div>
    );
}