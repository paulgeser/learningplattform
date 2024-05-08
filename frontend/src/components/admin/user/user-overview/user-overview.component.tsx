import React, { useEffect, useState } from "react";


import './user-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PasswordIcon from '@mui/icons-material/Password';
import { getAllAppUsers } from "../../../../core/services/user.service";
import { BasicUser } from "../../../../core/model/basic-user.model";
import { CreateUserDialogComponent } from "../create-user/create-user.component";
import { DeleteUserDialogComponent } from "../delete-user/delete-user.component";
import { StudyLanguage } from "../../../../core/enum/study-language.enum";
import { AppRole } from "../../../../core/enum/app-role.enum";
import { EditUserDialogComponent } from "../edit-user/edit-user.component";
import { ChangeUserPasswordDialogComponent } from "../change-password/change-password.component";


export const UserOverviewComponent: React.FC = (): React.ReactElement => {

    const [users, setUsers] = useState<BasicUser[]>([]);
    const [createUserDialog, setCreateUserDialog] = useState<boolean>(false);
    const [editUserDialog, setEditUserDialog] = useState<boolean>(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState<boolean>(false);
    const [deleteUserDialog, setDeleteUserDialog] = useState<boolean>(false);

    const [editUsername, setEditUsername] = useState<string>("");
    const [editFirstName, setEditFirstName] = useState<string>("");
    const [editLastName, setEditLastName] = useState<string>("");
    const [editEmail, setEditEmail] = useState<string>("");
    const [editPhone, setEditPhone] = useState<string>("");
    const [editStudyLanguage, setEditStudyLanguage] = useState<StudyLanguage>(StudyLanguage.ENGLISH);
    const [editAppRole, setEditAppRole] = useState<AppRole>(AppRole.STUDENT);

    const [chnagePasswordUsername, setChangePasswordUsername] = useState<string>("");
    const [deleteUsername, setDeleteUsername] = useState<string>("");

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = (): void => {
        getAllAppUsers().then(response => {
            if (response) {
                setUsers(response.data);
            }
        });
    }

    const onCloseCreateDialog = (): void => {
        setCreateUserDialog(false);
        getAllUsers();
    }

    const onCloseEditDialog = (): void => {
        setEditUsername("");
        setEditFirstName("");
        setEditLastName("");
        setEditEmail("");
        setEditPhone("");
        setEditStudyLanguage(StudyLanguage.ENGLISH);
        setEditAppRole(AppRole.STUDENT);
        setEditUserDialog(false);
        getAllUsers();
    }

    const onCloseDeleteDialog = (): void => {
        setDeleteUsername("");
        setDeleteUserDialog(false);
        getAllUsers();
    }

    const onCloseChangePasswordDialog = (): void => {
        setChangePasswordDialog(false);
    }

    const handleEditClick = (appUser: BasicUser): void => {
        setEditUsername(appUser.username);
        setEditFirstName(appUser.firstName);
        setEditLastName(appUser.lastName);
        setEditEmail(appUser.email);
        setEditPhone(appUser.phone);
        setEditStudyLanguage(appUser.studyLanguage);
        setEditAppRole(appUser.appRole);
        setEditUserDialog(true);
    }

    const handlePasswordChangeClick = (appUser: BasicUser): void => {
        setChangePasswordUsername(appUser.username);
        setChangePasswordDialog(true);
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

                    <div className="mt-5">
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
                                                    <Tooltip title="Change password of user">
                                                        <IconButton aria-label="change-password" size="large"
                                                            id="change-password-button"
                                                            onClick={() => handlePasswordChangeClick(userItem)}>
                                                            <PasswordIcon />
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
                <CreateUserDialogComponent onClose={onCloseCreateDialog} open={createUserDialog} />
                <DeleteUserDialogComponent username={deleteUsername} onClose={onCloseDeleteDialog} open={deleteUserDialog} />
                <EditUserDialogComponent username={editUsername} firstName={editFirstName} setFirstName={setEditFirstName} lastName={editLastName} setLastName={setEditLastName}
                    email={editEmail} setEmail={setEditEmail} phone={editPhone} setPhone={setEditPhone} studyLanguage={editStudyLanguage} setStudyLanguage={setEditStudyLanguage}
                    appRole={editAppRole} setAppRole={setEditAppRole} open={editUserDialog} onClose={onCloseEditDialog} />
                <ChangeUserPasswordDialogComponent open={changePasswordDialog} onClose={onCloseChangePasswordDialog} username={chnagePasswordUsername} />
            </div>
        </div>
    );
}