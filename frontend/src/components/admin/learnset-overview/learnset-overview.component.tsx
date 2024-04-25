import React, { useEffect, useState } from "react";


import './learnset-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem } from "@mui/material";
import { LearnSetStatus } from "../../model/status.enum";
import { CreateLearnSetDialogComponent } from "../create-learnset/create-learnset.component";
import { getAllLearnSets } from "../../../services/learnset.service";
import { LearnSet } from "../../model/learnset.model";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const LearnsetOverviewComponent: React.FC = (): React.ReactElement => {

    const [learnSets, setLearnSets] = useState<LearnSet[]>([]);
    const [createLearnsetDialog, setCreateLearnsetDialog] = useState<boolean>(false);

    useEffect(() => {
        getAllLearnSets().then(values => {
            setLearnSets(values);
        });
    }, []);

    const onCloseDialog = () => {
        setCreateLearnsetDialog(false);
        getAllLearnSets().then(values => {
            setLearnSets(values);
        });
    }

    return (
        <div>
            <div id="learnset-overview-outside-box">
                <div id="learnset-overview-content-box">
                    <div id="learnset-overview-title">
                        Learnset overview

                        <div>
                            <Button variant='outlined' onClick={() => setCreateLearnsetDialog(true)}>Create new learnset</Button>
                        </div>
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
                                                        /* aria-controls={open ? 'basic-menu' : undefined}
                                                        aria-haspopup="true"
                                                        aria-expanded={open ? 'true' : undefined}
                                                        onClick={handleClick}*/>
                                                        <EditIcon />
                                                    </IconButton>
                                                    {/* <Menu
                                                        id="add-menu"
                                                        anchorEl={anchorEl}
                                                        open={open}
                                                        onClose={() => handleClose('', '')} 
                                                        MenuListProps={{
                                                            'aria-labelledby': 'add-button',
                                                        }}
                                                    > 
                                                        <MenuItem disabled={learnItem.status === LearnSetStatus.TEXT || learnItem.status === LearnSetStatus.PICTURE || learnItem.status === LearnSetStatus.READY} onClick={() => handleClose('text', learnItem._id)}>Text</MenuItem>
                                                        <MenuItem disabled={learnItem.status === LearnSetStatus.CREATED || learnItem.status === LearnSetStatus.PICTURE || learnItem.status === LearnSetStatus.READY} onClick={() => handleClose('pictures', learnItem._id)}>Pictures</MenuItem>
                                                        <MenuItem disabled={learnItem.status === LearnSetStatus.TEXT || learnItem.status === LearnSetStatus.CREATED || learnItem.status === LearnSetStatus.READY} onClick={() => handleClose('audio', learnItem._id)}>Audio</MenuItem>
                                                    </Menu>*/}
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
        </div>
    );
}
