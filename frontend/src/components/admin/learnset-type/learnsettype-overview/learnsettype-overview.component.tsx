import React, { useEffect, useState } from "react";


import './learnsettype-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Menu, MenuItem } from "@mui/material";
import { LearnSetStatus } from "../../../model/status.enum";
import { CreateLearnSetDialogComponent } from "../../create-learnset/create-learnset.component";
import { LearnSet } from "../../../model/learnset.model";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { LearnSetType } from "../../../model/learnset-type.model";
import { CreateLearnSetTypeDialogComponent } from "../create-learnset-type/create-learnset-type.component";
import { getAllLearnSetTypes } from "../../../../services/learnset-type.service";
import { EditLearnSetTypeDialogComponent } from "../edit-learnset-type/edit-learnset-type.component";
import { DeleteLearnSetTypeDialogComponent } from "../delete-learnset-type/delete-learnset-type.component";

export const LearnsetTypeOverviewComponent: React.FC = (): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);
    const [createLearnsetTypeDialog, setCreateLearnsetTypeDialog] = useState<boolean>(false);
    const [editLearnsetTypeDialog, setEditLearnsetTypeDialog] = useState<boolean>(false);
    const [deleteLearnsetTypeDialog, setDeleteLearnsetTypeDialog] = useState<boolean>(false);

    const [editId, setEditId] = useState<string>("");
    const [editName, setEditName] = useState<string>("");
    const [editDescription, setEditDescription] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");

    useEffect(() => {
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });
    }, []);

    const onCloseCreateDialog = (): void => {
        setCreateLearnsetTypeDialog(false);
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });
    };

    const handleEditClick = (learnsetType: LearnSetType): void => {
        setEditId(learnsetType._id);
        setEditName(learnsetType.name);
        setEditDescription(learnsetType.description);
        setEditLearnsetTypeDialog(true);
    }

    const onCloseEditDialog = (): void => {
        setEditId("");
        setEditName("");
        setEditDescription("");
        setEditLearnsetTypeDialog(false);
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });
    }

    const onCloseDeleteDialog = (): void => {
        setDeleteId("");
        setDeleteLearnsetTypeDialog(false);
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });
    }

    return (
        <div>
            <div id="learnset-overview-outside-box">
                <div id="learnset-overview-content-box">
                    <div id="learnset-overview-title">
                        Learnset Type overview

                        <div className="ml-3">
                            <Button variant='outlined' onClick={() => setCreateLearnsetTypeDialog(true)}>Create new learnset type</Button>
                        </div>
                    </div>

                    <div>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Unique ID</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {learnSetTypes.map((learnSetTypeItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell component="th" scope="row">
                                                    {learnSetTypeItem._id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnSetTypeItem.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnSetTypeItem.description}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <IconButton aria-label="edit" size="large"
                                                        id="edit-button"
                                                        onClick={() => handleEditClick(learnSetTypeItem)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton aria-label="delete" size="large"
                                                        id="delete-button"
                                                        onClick={() => { setDeleteId(learnSetTypeItem._id); setDeleteLearnsetTypeDialog(true) }}>
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
                <CreateLearnSetTypeDialogComponent onClose={onCloseCreateDialog} open={createLearnsetTypeDialog} />
                <EditLearnSetTypeDialogComponent
                    onClose={onCloseEditDialog} open={editLearnsetTypeDialog}
                    id={editId} name={editName} setName={setEditName}
                    description={editDescription} setDescription={setEditDescription} />
                <DeleteLearnSetTypeDialogComponent
                    onClose={onCloseDeleteDialog} open={deleteLearnsetTypeDialog}
                    id={deleteId} />
            </div>
        </div>
    );
}
