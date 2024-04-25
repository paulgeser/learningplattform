import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest, getAllLearnSetStates } from "../../../services/learnset.service";
import { LearnSetStatus } from "../../model/status.enum";
import { LearnSetType } from "../../model/learnset-type.model";
import { getAllLearnSetTypes } from "../../../services/learnset-type.service";


interface Props {
    open: boolean
    onClose: () => void;
}

export const CreateLearnSetDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);
    const [learnSetStates, setLearnSetStates] = useState<LearnSetStatus[]>([]);

    const [selectedLearnSetType, setSelectedLearnSetType] = useState<LearnSetType | null>(null);
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<number>(0);

    const handleClose = () => {
        onClose();
    };

    const createLearnSet = () => {
        if (selectedLearnSetType) {
            createLearnSetRequest({ name: name, week: week, status: LearnSetStatus.DRAFT, type: selectedLearnSetType }).then(value => {
                onClose();
            });
        }
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
            <DialogTitle>Create new learnset</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-types-select-label">Status</InputLabel>
                    <Select
                        labelId="learnset-types-select-label"
                        id="learnset-types-select"
                        value={selectedLearnSetType?.name}
                        label="Type"
                        onChange={((event: SelectChangeEvent) => setSelectedLearnSetType(event.target.value as any))}
                    >
                        {learnSetTypes.map(learnType => (<MenuItem key={learnType.name} value={learnType.name}>{learnType.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField id="week-field" label="Week" variant="outlined" type="number" fullWidth value={week} onChange={(e) => setWeek(Number(e.target.value))} />
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
