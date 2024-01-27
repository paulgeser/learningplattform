import React, { useState, useContext, useEffect } from "react";
import { ProgressAndDataModel } from "./home.component";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest, getAllLearnSetStates, getAllLearnSetTypes } from "../services/learnset.service";
import { LearnSetType } from "../model/type.enum";
import { LearnSetStatus } from "../model/status.enum";


interface Props {
    open: boolean
    onClose: (value: any) => void;
}

export const BasicDataDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);
    const [learnSetStates, setLearnSetStates] = useState<LearnSetStatus[]>([]);

    const [selectedLearnSetStatus, setSelectedLearnSetStatus] = useState<LearnSetStatus>(LearnSetStatus.CREATED);
    const [selectedLearnSetType, setSelectedLearnSetType] = useState<LearnSetType>(LearnSetType.PRONOUNS);
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<number>(0);

    const handleClose = () => {
        onClose(null);
    };

    const createLearnSet = () => {
        createLearnSetRequest({ name: name, week: week, status: selectedLearnSetStatus, type: selectedLearnSetType }).then(value => {
            console.log(value._id);
        })
    }

    useEffect(() => {
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });

        getAllLearnSetStates().then(values => {
            setLearnSetStates(values);
        });
    }, []);

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <DialogContent>
                <p>Test asdfasdf</p>
                <TextField id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-states-select-label">Status</InputLabel>
                    <Select
                        labelId="learnset-states-select-label"
                        id="learnset-states-select"
                        value={selectedLearnSetStatus}
                        label="Status"
                        onChange={((event: SelectChangeEvent) => setSelectedLearnSetStatus(event.target.value as LearnSetStatus))}
                    >
                        {learnSetStates.map(learnStatus => (<MenuItem key={learnStatus} value={learnStatus}>{learnStatus}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-types-select-label">Status</InputLabel>
                    <Select
                        labelId="learnset-types-select-label"
                        id="learnset-types-select"
                        value={selectedLearnSetType}
                        label="Type"
                        onChange={((event: SelectChangeEvent) => setSelectedLearnSetType(event.target.value as LearnSetType))}
                    >
                        {learnSetTypes.map(learnType => (<MenuItem key={learnType} value={learnType}>{learnType}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField id="week-field" label="Week" variant="outlined" type="number" fullWidth value={week} onChange={(e) => setWeek(Number(e.target.value))} />
                <br />
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose(null)}>Cancel</Button>
                    <Button variant="contained" onClick={createLearnSet}>Create</Button>
                </div>
            </DialogContent>
        </Dialog>
        /* setSelectedLearnSetStatus(event.target.value as LearnSetStatus) */
    );
}
