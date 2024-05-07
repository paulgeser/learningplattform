import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { StudyLanguage } from "../../../../core/enum/study-language.enum";
import { AppRole } from "../../../../core/enum/app-role.enum";
import { CreateUserModel } from "../../../../core/model/create-user.model";
import { createUserRequest } from "../../../../core/services/user.service";
import { useSnackbar } from "notistack";

interface Props {
    open: boolean
    onClose: () => void;
}

export const CreateUserDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [studyLanguage, setStudyLanguage] = useState<StudyLanguage>(StudyLanguage.ENGLISH);
    const [appRole, setAppRole] = useState<AppRole>(AppRole.STUDENT);
    const [firstPassword, setFirstPassword] = useState<string>("");
    const [secondPassword, setSecondPassword] = useState<string>("");

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
    }, []);


    const handleClose = () => {
        onClose();
    };

    const createLearnSet = () => {
        const newUser: CreateUserModel = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            studyLanguage: studyLanguage,
            appRole: appRole,
            password: firstPassword,
            active: true
        }
        createUserRequest(newUser).then(response => {
            if (response) {
                enqueueSnackbar('Successfully created new user!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during user creation...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
            onClose();
            setUsername("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhone("");
            setStudyLanguage(StudyLanguage.ENGLISH);
            setAppRole(AppRole.STUDENT);
            setFirstPassword("");
            setSecondPassword("");
        });
    }

    const handleStudyLanguageChange = (studyLanguageInput: string): void => {
        setStudyLanguage(studyLanguageInput as StudyLanguage);
    }

    const handleAppRoleChange = (appRoleInput: string): void => {
        setAppRole(appRoleInput as AppRole);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Create new user</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="username-field" label="Username" variant="outlined" type="text" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="firstname-field" label="First name" variant="outlined" type="text" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="lastname-field" label="Last name" variant="outlined" type="text" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="email-field" label="Email" variant="outlined" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="phone-field" label="Phone" variant="outlined" type="text" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="studyLanguage-select-label">Study language</InputLabel>
                    <Select
                        labelId="studyLanguage-select-label"
                        id="studyLanguage-select"
                        value={studyLanguage}
                        label="Study language"
                        onChange={((event: SelectChangeEvent) => handleStudyLanguageChange(event.target.value))}
                    >
                        {Object.keys(StudyLanguage).map(studyLanguageLoop => (<MenuItem key={studyLanguageLoop} value={studyLanguageLoop}>{studyLanguageLoop}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="userRole-select-label">User role</InputLabel>
                    <Select
                        labelId="userRole-select-label"
                        id="userRole-select"
                        value={appRole}
                        label="User role"
                        onChange={((event: SelectChangeEvent) => handleAppRoleChange(event.target.value))}
                    >
                        {Object.keys(AppRole).map(appRoleLoop => (<MenuItem key={appRoleLoop} value={appRoleLoop}>{appRoleLoop}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="first-password-field" label="Password" variant="outlined" type="password" fullWidth value={firstPassword} onChange={(e) => setFirstPassword(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="second-password-field" label="Confirm password" variant="outlined" type="password" fullWidth value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createLearnSet}>Create</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
