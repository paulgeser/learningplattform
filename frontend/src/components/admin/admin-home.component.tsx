import React, { useEffect, useState } from 'react';

import './admin-home.component.css';
import { getAllLearnSets } from '../../services/learnset.service';
import { LearnSet } from '../model/learnset.model';
import { Box, Button, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { CreateLearnSetDialogComponent } from './learnset/create-learnset.component';
import { useNavigate } from 'react-router-dom';

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

        } else if (value === 'audio') {

        }
    };

    const onCloseDialog = () => {
        setCreateLearnsetDialog(false);
        getAllLearnSets().then(values => {
            setLearnSets(values);
        })
    }

    return (
        <div id="admin-home-outside-box">
            <div id="admin-home-content-box">
                <div id="admin-home-title">Admin Home</div>
                <div>
                    <Button variant='outlined' onClick={() => setCreateLearnsetDialog(true)}>Create new learnset</Button>
                </div>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Week</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {learnSets.map((learnItem, i) => (
                                        <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                            <TableCell component="th" scope="row">
                                                {learnItem._id}
                                            </TableCell>
                                            <TableCell align="right">
                                                {learnItem.name}
                                            </TableCell>
                                            <TableCell align="right">
                                                {learnItem.week}
                                            </TableCell>
                                            <TableCell align="right">
                                                {learnItem.status}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton aria-label="add" size="large"
                                                    id="add-button"
                                                    aria-controls={open ? 'basic-menu' : undefined}
                                                    aria-haspopup="true"
                                                    aria-expanded={open ? 'true' : undefined}
                                                    onClick={handleClick}>
                                                    <AddIcon />
                                                </IconButton>
                                                <Menu
                                                    id="add-menu"
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={() => handleClose('', '')}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'add-button',
                                                    }}
                                                >
                                                    <MenuItem onClick={() => handleClose('text', learnItem._id)}>Text</MenuItem>
                                                    <MenuItem onClick={() => handleClose('pictures', learnItem._id)}>Pictures</MenuItem>
                                                    <MenuItem onClick={() => handleClose('audio', learnItem._id)}>Audio</MenuItem>
                                                </Menu>
                                                <IconButton aria-label="edit" size="large">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton aria-label="delete" size="large">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>
            </div>
            <CreateLearnSetDialogComponent onClose={onCloseDialog} open={createLearnsetDialog} />
        </div>
    );
}