import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { createLearnSetTypeRequest, deleteLearnSetTypeRequest } from "../../../../services/learnset-type.service";



interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteLearnSetTypeDialogComponent: React.FC<Props> = ({ onClose, open, id }): React.ReactElement => {


    const handleClose = () => {
        onClose();
    };

    const deleteLearnSetType = () => {
        deleteLearnSetTypeRequest(id).then(_ => {
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Delete learnset type</DialogTitle>
            <DialogContent>
                <br />
                <p>Are you sure you want to delete this learnset type?</p>
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={deleteLearnSetType}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
