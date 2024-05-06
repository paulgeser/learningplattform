import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest, updateLearnSetRequest } from "../../../../core/services/learnset.service";
import { LearnSetStatus } from "../../../../core/enum/status.enum";
import { LearnSetType } from "../../../../core/model/learnset-type.model";
import { getAllLearnSetTypes } from "../../../../core/services/learnset-type.service";
import { getAllLearnSetStates } from "../../../../core/services/learnset-state.service";


interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    status: LearnSetStatus;
    setStatus: React.Dispatch<React.SetStateAction<LearnSetStatus>>;
    learnsetType: string;
    setLearnsetType: React.Dispatch<React.SetStateAction<string>>;
    week: number;
    setWeek: React.Dispatch<React.SetStateAction<number>>;
}

export const EditLearnSetDialogComponent: React.FC<Props> = ({ onClose, open, id, name, setName, status, setStatus, learnsetType, setLearnsetType, week, setWeek }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);
    const [learnSetStates, setLearnSetStates] = useState<LearnSetStatus[]>([]);

    useEffect(() => {
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });

        getAllLearnSetStates().then(values => {
            setLearnSetStates(values);
        });
    }, []);


    const handleClose = () => {
        onClose();
    };

    const saveLearnSet = () => {
        const foundLearnsetType = learnSetTypes.find(x => x._id === learnsetType);
        if (foundLearnsetType) {
            const data = { _id: id, name: name, week: week, status: status, type: foundLearnsetType }
            updateLearnSetRequest(data).then(_ => {
                onClose();
            });
        }
    }

    const handleLearnsetTypeChange = (id: string): void => {
        setLearnsetType(id);

    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit learnset</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-types-select-label">Learnset type</InputLabel>
                    <Select
                        labelId="learnset-types-select-label"
                        id="learnset-types-select"
                        value={learnsetType}
                        label="Type"
                        onChange={((event: SelectChangeEvent) => handleLearnsetTypeChange(event.target.value))}
                    >
                        {learnSetTypes.map(learnType => (<MenuItem key={learnType._id} value={learnType._id}>{learnType.name}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-states-select-label">Learnset status</InputLabel>
                    <Select
                        labelId="learnset-states-select-label"
                        id="learnset-states-select"
                        value={status}
                        label="Status"
                        onChange={((event: SelectChangeEvent) => setStatus(event.target.value as LearnSetStatus))}
                    >
                        {learnSetStates.map(learnType => (<MenuItem key={learnType} value={learnType}>{learnType}</MenuItem>))}
                    </Select>
                </FormControl>
                <br />
                <br />
                <TextField id="week-field" label="Week" variant="outlined" type="number" fullWidth value={week} onChange={(e) => setWeek(Number(e.target.value))} />
                <br />
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={saveLearnSet}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
