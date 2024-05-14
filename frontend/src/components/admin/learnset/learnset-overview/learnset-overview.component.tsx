import React, { useEffect, useState } from "react";


import './learnset-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import { CreateLearnSetDialogComponent } from "../create-learnset/create-learnset.component";
import { getAllLearnSets } from "../../../../core/services/learnset.service";
import { LearnSet } from "../../../../core/model/learnset.model";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import { LearnSetStatus } from "../../../../core/enum/status.enum";
import { EditLearnSetDialogComponent } from "../edit-learnset/edit-learnset.component";
import { DeleteLearnSetDialogComponent } from "../delete-learnset/delete-learnset.component";
import { useNavigate } from "react-router-dom";

export const LearnsetOverviewComponent: React.FC = (): React.ReactElement => {

    const [learnSets, setLearnSets] = useState<LearnSet[]>([]);
    const [createLearnsetDialog, setCreateLearnsetDialog] = useState<boolean>(false);
    const [editLearnsetDialog, setEditLearnsetDialog] = useState<boolean>(false);
    const [deleteLearnsetDialog, setDeleteLearnsetDialog] = useState<boolean>(false);

    const [editId, setEditId] = useState<string>("");
    const [editName, setEditName] = useState<string>("");
    const [editStatus, setEditStatus] = useState<LearnSetStatus>(LearnSetStatus.DRAFT);
    const [editLearnsetType, setEditLearnsetType] = useState<string>("");
    const [editWeek, setEditWeek] = useState<number>(0);
    const [editChapter, setEditChapter] = useState<number>(0);

    const [deleteId, setDeleteId] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        getLearnSets();
    }, []);

    const getLearnSets = () => {
        getAllLearnSets().then(response => {
            if (response) {
                setLearnSets(response.data);
            }
        });
    }

    const onCloseCreateDialog = () => {
        setCreateLearnsetDialog(false);
        getLearnSets();
    }

    const onCloseEditDialog = () => {
        setEditId("");
        setEditName("");
        setEditStatus(LearnSetStatus.DRAFT);
        setEditLearnsetType("");
        setEditWeek(0);
        setEditLearnsetDialog(false);
        getLearnSets();
    }

    const onCloseDeleteDialog = () => {
        setDeleteId("");
        setDeleteLearnsetDialog(false);
        getLearnSets();
    }

    const handleEditClick = (learnset: LearnSet): void => {
        setEditId(learnset._id);
        setEditName(learnset.name);
        setEditStatus(learnset.status);
        setEditLearnsetType(learnset.type._id);
        setEditWeek(learnset.week);
        setEditChapter(learnset.chapter);
        setEditLearnsetDialog(true);
    }

    const handleViewWordsClick = (learnset: LearnSet): void => {
        navigate(`/admin/learnset-words/${learnset._id}`);
    }

    return (
        <div>
            <div id="learnset-overview-outside-box">
                <div id="learnset-overview-content-box">
                    <div id="learnset-overview-title">
                        Learnset overview
                        <div className="ml-3">
                            <Button variant='outlined' onClick={() => setCreateLearnsetDialog(true)}>Create new learnset</Button>
                        </div>
                    </div>

                    <div className="mt-5">
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Week</TableCell>
                                            <TableCell>Chapter</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Unique ID</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {learnSets.map((learnsetItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell align="left">
                                                    {learnsetItem.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetItem.week}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetItem.chapter}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetItem.type.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetItem.status}
                                                </TableCell>
                                                <TableCell align="left" width="200px">
                                                    {learnsetItem._id}
                                                </TableCell>
                                                <TableCell align="right" width="200px">
                                                    <Tooltip title="View words of learnset">
                                                        <IconButton aria-label="words" size="large"
                                                            id="words-button"
                                                            onClick={() => handleViewWordsClick(learnsetItem)}>
                                                            <ViewListIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit learnset">
                                                        <IconButton aria-label="edit" size="large"
                                                            id="edit-button"
                                                            onClick={() => handleEditClick(learnsetItem)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete learnset">
                                                        <IconButton aria-label="delete" size="large"
                                                            id="delete-button"
                                                            onClick={() => { setDeleteId(learnsetItem._id); setDeleteLearnsetDialog(true) }}>
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
                <CreateLearnSetDialogComponent onClose={onCloseCreateDialog} open={createLearnsetDialog} />
                <EditLearnSetDialogComponent onClose={onCloseEditDialog} open={editLearnsetDialog}
                    id={editId} name={editName} setName={setEditName} status={editStatus} setStatus={setEditStatus}
                    learnsetType={editLearnsetType} setLearnsetType={setEditLearnsetType}
                    week={editWeek} setWeek={setEditWeek} chapter={editChapter} setChapter={setEditChapter} />
                <DeleteLearnSetDialogComponent id={deleteId} onClose={onCloseDeleteDialog} open={deleteLearnsetDialog} />
            </div>
        </div>
    );
}