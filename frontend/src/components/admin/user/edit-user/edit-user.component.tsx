import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { AppRole } from "../../../../core/enum/app-role.enum";
import { StudyLanguage } from "../../../../core/enum/study-language.enum";
import { BasicUser } from "../../../../core/model/basic-user.model";
import { updateUserRequest } from "../../../../core/services/user.service";

interface Props {
    open: boolean;
    onClose: () => void;
    username: string;
    firstName: string;
    setFirstName: (value: React.SetStateAction<string>) => void;
    lastName: string;
    setLastName: (value: React.SetStateAction<string>) => void;
    phone: string;
    setPhone: (value: React.SetStateAction<string>) => void;
    email: string;
    setEmail: (value: React.SetStateAction<string>) => void;
    studyLanguage: StudyLanguage;
    setStudyLanguage: (value: React.SetStateAction<StudyLanguage>) => void;
    appRole: AppRole;
    setAppRole: (value: React.SetStateAction<AppRole>) => void;
}

export const EditUserDialogComponent: React.FC<Props> = ({ open, onClose, username, firstName, setFirstName, lastName, setLastName, phone, setPhone, email, setEmail, studyLanguage, setStudyLanguage, appRole, setAppRole }): React.ReactElement => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const createUser = () => {
        const updatedUser: BasicUser = {
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            studyLanguage: studyLanguage,
            appRole: appRole,
            active: true
        };
        updateUserRequest(updatedUser).then(response => {
            if (response) {
                enqueueSnackbar('Successfully updated user!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during user update...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
            onClose();
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
            <DialogTitle>Edit user details</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="firstname-field" label="First name" variant="outlined" type="text" fullWidth value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="lastname-field" label="Last name" variant="outlined" type="text" fullWidth value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="email-field" label="Email" variant="outlined" type="text" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="phone-field" label="Phone" variant="outlined" type="text" fullWidth value={phone} onChange={(e) => setPhone(e.target.value)} />
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
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createUser}>Save edit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
