import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { updateLearnSetTypeRequest } from "../../../../core/services/learnset-type.service";
import { useSnackbar } from "notistack";




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

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const createLearnSetType = () => {
        updateLearnSetTypeRequest({
            _id: id,
            name: name,
            description: description
        }).then(response => {
            if (response) {
                enqueueSnackbar('Successfully updated learnset type!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during learnset type update...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Edit learnset type</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField id="description-field" label="Description" variant="outlined" type="text" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} autoComplete='off' />
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
