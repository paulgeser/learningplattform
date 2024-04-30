import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest } from "../../../../core/services/learnset.service";
import { LearnSetStatus } from "../../../../core/model/status.enum";
import { LearnSetType } from "../../../../core/model/learnset-type.model";
import { getAllLearnSetTypes } from "../../../../core/services/learnset-type.service";

interface Props {
    open: boolean
    onClose: () => void;
}

export const CreateLearnSetDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);

    const [selectedLearnSetType, setSelectedLearnSetType] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<number>(0);

    useEffect(() => {
        getAllLearnSetTypes().then(values => {
            setLearnSetTypes(values);
        });
    }, []);


    const handleClose = () => {
        onClose();
    };

    const createLearnSet = () => {
        const foundLearnsetType = learnSetTypes.find(x => x._id === selectedLearnSetType);
        if (foundLearnsetType) {
            const data = { name: name, week: week, status: LearnSetStatus.DRAFT, type: foundLearnsetType }
            createLearnSetRequest(data).then(_ => {
                onClose();
            });
        }
    }

    const handleLearnsetTypeChange = (id: string): void => {
        setSelectedLearnSetType(id);
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create new learnset</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="learnset-types-select-label">Learnset type</InputLabel>
                    <Select
                        labelId="learnset-types-select-label"
                        id="learnset-types-select"
                        value={selectedLearnSetType}
                        label="Type"
                        onChange={((event: SelectChangeEvent) => handleLearnsetTypeChange(event.target.value))}
                    >
                        {learnSetTypes.map(learnType => (<MenuItem key={learnType._id} value={learnType._id}>{learnType.name}</MenuItem>))}
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
