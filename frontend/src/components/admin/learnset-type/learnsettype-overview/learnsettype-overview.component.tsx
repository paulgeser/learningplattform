import React, { useEffect, useState } from "react";

import './learnsettype-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { LearnSetType } from "../../../../core/model/learnset-type.model";
import { CreateLearnSetTypeDialogComponent } from "../create-learnset-type/create-learnset-type.component";
import { getAllLearnSetTypes } from "../../../../core/services/learnset-type.service";
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
        loadLearnSetTypes();
    }, []);

    const loadLearnSetTypes = () => {
        getAllLearnSetTypes().then(response => {
            if (response) {
                setLearnSetTypes(response.data);
            }
        });
    }

    const onCloseCreateDialog = (): void => {
        setCreateLearnsetTypeDialog(false);
        loadLearnSetTypes();
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
        loadLearnSetTypes();
    }

    const onCloseDeleteDialog = (): void => {
        setDeleteId("");
        setDeleteLearnsetTypeDialog(false);
        loadLearnSetTypes();
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
                                                    <Tooltip title="Edit learnset type">
                                                        <IconButton aria-label="edit" size="large"
                                                            id="edit-button"
                                                            onClick={() => handleEditClick(learnSetTypeItem)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete learnset">
                                                        <IconButton aria-label="delete" size="large"
                                                            id="delete-button"
                                                            onClick={() => { setDeleteId(learnSetTypeItem._id); setDeleteLearnsetTypeDialog(true) }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
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
