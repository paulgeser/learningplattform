import React, { useEffect, useState } from "react";


import './user-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import { getAllLearnSets } from "../../../../core/services/learnset.service";
import { LearnSet } from "../../../../core/model/learnset.model";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewListIcon from '@mui/icons-material/ViewList';
import { LearnSetStatus } from "../../../../core/enum/status.enum";
import { useNavigate } from "react-router-dom";
import { getAllAppUsers } from "../../../../core/services/user.service";
import { BasicUser } from "../../../../core/model/basic-user.model";


export const UserOverviewComponent: React.FC = (): React.ReactElement => {

    const [users, setUsers] = useState<BasicUser[]>([]);
    const [createUserDialog, setCreateUserDialog] = useState<boolean>(false);
    const [editUserDialog, setEditUserDialog] = useState<boolean>(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState<boolean>(false);

    const [editId, setEditId] = useState<string>("");
    const [editName, setEditName] = useState<string>("");
    const [editStatus, setEditStatus] = useState<LearnSetStatus>(LearnSetStatus.DRAFT);
    const [editLearnsetType, setEditLearnsetType] = useState<string>("");
    const [editWeek, setEditWeek] = useState<number>(0);
    const [deleteUsername, setDeleteUsername] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        getAllAppUsers().then(response => {
            if (response) {
                setUsers(response.data);
            }
        })
    }

    const onCloseCreateDialog = () => {
        /* setCreateLearnsetDialog(false);
        getAllLearnSets().then(values => {
            setLearnSets(values);
        }); */
    }

    const onCloseEditDialog = () => {
        /* setEditId("");
        setEditName("");
        setEditStatus(LearnSetStatus.DRAFT);
        setEditLearnsetType("");
        setEditWeek(0);
        setEditLearnsetDialog(false);
        getAllLearnSets().then(values => {
            setLearnSets(values);
        }); */
    }

    const onCloseDeleteDialog = () => {
        /*  setDeleteId("");
         setDeleteLearnsetDialog(false);
         getAllLearnSets().then(values => {
             setLearnSets(values);
         }); */
    }

    const handleEditClick = (appUser: BasicUser): void => {
        /* setEditId(learnset._id);
        setEditName(learnset.name);
        setEditStatus(learnset.status);
        setEditLearnsetType(learnset.type._id);
        setEditWeek(learnset.week);
        setEditLearnsetDialog(true); */
    }

    const handleViewWordsClick = (learnset: LearnSet): void => {
        navigate(`/admin/learnset-words/${learnset._id}`);
    }

    return (
        <div>
            <div id="learnset-overview-outside-box">
                <div id="learnset-overview-content-box">
                    <div id="learnset-overview-title">
                        Users overview

                        <div className="ml-3">
                            <Button variant='outlined' onClick={() => setCreateUserDialog(true)}>Create new user</Button>
                        </div>
                    </div>

                    <div>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Username</TableCell>
                                            <TableCell>First name</TableCell>
                                            <TableCell>Last name</TableCell>
                                            <TableCell>Role</TableCell>
                                            <TableCell>Language</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.map((userItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell component="th" scope="row">
                                                    {userItem.username}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {userItem.firstName}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {userItem.lastName}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {userItem.appRole}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {userItem.studyLanguage}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Edit user">
                                                        <IconButton aria-label="edit" size="large"
                                                            id="edit-button"
                                                            onClick={() => handleEditClick(userItem)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete user">
                                                        <IconButton aria-label="delete" size="large"
                                                            id="delete-button"
                                                            onClick={() => { setDeleteUsername(userItem.username); setDeleteUserDialog(true) }}>
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
                {/* <CreateLearnSetDialogComponent onClose={onCloseCreateDialog} open={createLearnsetDialog} />
                <EditLearnSetDialogComponent onClose={onCloseEditDialog} open={editLearnsetDialog}
                    id={editId} name={editName} setName={setEditName} status={editStatus} setStatus={setEditStatus}
                    learnsetType={editLearnsetType} setLearnsetType={setEditLearnsetType}
                    week={editWeek} setWeek={setEditWeek} />
                <DeleteLearnSetDialogComponent id={deleteId} onClose={onCloseDeleteDialog} open={deleteLearnsetDialog} /> */}
            </div>
        </div>
    );
}