import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { createLearnSetRequest } from "../../../../core/services/learnset.service";
import { LearnSetStatus } from "../../../../core/enum/status.enum";
import { LearnSetType } from "../../../../core/model/learnset-type.model";
import { getAllLearnSetTypes } from "../../../../core/services/learnset-type.service";
import { useSnackbar } from "notistack";

interface Props {
    open: boolean
    onClose: () => void;
}

export const CreateLearnSetDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [learnSetTypes, setLearnSetTypes] = useState<LearnSetType[]>([]);

    const [selectedLearnSetType, setSelectedLearnSetType] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [week, setWeek] = useState<number>(0);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getAllLearnSetTypes().then(response => {
            if (response) {
                setLearnSetTypes(response.data);
            }
        });
    }, []);


    const handleClose = () => {
        onClose();
    };

    const createLearnSet = () => {
        const foundLearnsetType = learnSetTypes.find(x => x._id === selectedLearnSetType);
        if (foundLearnsetType) {
            const data = { name: name, week: week, status: LearnSetStatus.DRAFT, type: foundLearnsetType }
            createLearnSetRequest(data).then(response => {
                if (response) {
                    enqueueSnackbar('Successfully created learnset!', {
                        autoHideDuration: 6000,
                        variant: "success"
                    });
                } else {
                    enqueueSnackbar('Failure during learnset creation...', {
                        autoHideDuration: 6000,
                        variant: "error"
                    });
                }
                onClose();
                setSelectedLearnSetType("");
                setName("");
                setWeek(0);
            });
        }
    }

    const handleLearnsetTypeChange = (id: string): void => {
        setSelectedLearnSetType(id);
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Create new learnset</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' />
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
                <TextField id="week-field" label="Week" variant="outlined" type="number" fullWidth value={week} onChange={(e) => setWeek(Number(e.target.value))} autoComplete='off' />
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
