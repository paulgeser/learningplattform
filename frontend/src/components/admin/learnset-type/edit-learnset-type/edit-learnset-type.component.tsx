import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { updateLearnSetTypeRequest } from "../../../../services/learnset-type.service";




interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
    name: string;
    setName: (value: React.SetStateAction<string>) => void;
    description: string;
    setDescription: (value: React.SetStateAction<string>) => void
}

export const EditLearnSetTypeDialogComponent: React.FC<Props> = ({ open, onClose, id, name, setName, description, setDescription }): React.ReactElement => {


    const handleClose = () => {
        onClose();
    };

    const createLearnSetType = () => {
        updateLearnSetTypeRequest({
            _id: id,
            name: name,
            description: description
        }).then(_ => {
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Edit learnset type</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <TextField id="description-field" label="Description" variant="outlined" type="text" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createLearnSetType}>Save edit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}