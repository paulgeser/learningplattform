import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest } from "../../../../core/services/learnset.service";
import { LearnSetStatus } from "../../../../core/enum/status.enum";
import { LearnSetType } from "../../../../core/model/learnset-type.model";
import { getAllLearnSetTypes } from "../../../../core/services/learnset-type.service";
import { StudyLanguage } from "../../../../core/enum/study-language.enum";

interface Props {
    open: boolean
    onClose: () => void;
}

export const CreateUserDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);

    const [username, setUsername] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [studyLanguage, setStudyLanguage] = useState<string>("");
    const [appRole, setAppRole] = useState<string>("");
    const [firstPassword, setFirstPassword] = useState<string>("");
    const [secondPassword, setSecondPassword] = useState<string>("");




    useEffect(() => {
        /* getAllLearnSetTypes().then(response => {
            if (response) {
                setLearnSetTypes(response.data);
            }
        }); */
    }, []);


    const handleClose = () => {
        onClose();
    };

    const createLearnSet = () => {
        /* const foundLearnsetType = learnSetTypes.find(x => x._id === selectedLearnSetType);
        if (foundLearnsetType) {
            const data = { name: name, week: week, status: LearnSetStatus.DRAFT, type: foundLearnsetType }
            createLearnSetRequest(data).then(_ => {
                onClose();
            });
        } */
    }

    const handleStudyLanguageChange = (studyLanguage: string): void => {
        setStudyLanguage(studyLanguage);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create new user</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="username-field" label="Username" variant="outlined" type="text" fullWidth value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
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
                        {Object.keys(StudyLanguage).map(studyLanguage => (<MenuItem key={studyLanguage} value={studyLanguage}>{studyLanguage}</MenuItem>))}
                    </Select>
                </FormControl>
                {/*  */}
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
