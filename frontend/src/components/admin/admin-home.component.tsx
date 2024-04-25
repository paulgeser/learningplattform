import React, { useEffect, useState } from 'react';

import './admin-home.component.css';
import { getAllLearnSets } from '../../services/learnset.service';
import { LearnSet } from '../model/learnset.model';
import { Box, Button, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateLearnSetDialogComponent } from './create-learnset/create-learnset.component';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { LearnSetStatus } from '../model/status.enum';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export const AdminHomeComponent: React.FC = (): React.ReactElement => {

    const [learnSets, setLearnSets] = useState<LearnSet[]>([]);
    const [createLearnsetDialog, setCreateLearnsetDialog] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        getAllLearnSets().then(values => {
            setLearnSets(values);
        })
    }, []);


    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (value: string, learnSetId: string) => {
        setAnchorEl(null);
        if (value === 'text') {
            navigate(`/admin/text/${learnSetId}`);
        } else if (value === 'pictures') {
            navigate(`/admin/pictures/${learnSetId}`);
        } else if (value === 'audio') {
            navigate(`/admin/audio/${learnSetId}`);
        }
    };

    const onCloseDialog = () => {
        setCreateLearnsetDialog(false);
        getAllLearnSets().then(values => {
            setLearnSets(values);
        })
    }

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