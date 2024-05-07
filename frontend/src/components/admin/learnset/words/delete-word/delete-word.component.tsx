import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { deleteWordRequest } from "../../../../../core/services/learnset-word.service";


interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteLearnSetWordDialogComponent: React.FC<Props> = ({ onClose, open, id }): React.ReactElement => {

    const handleClose = () => {
        onClose();
    };

    const deleteWord = () => {
        deleteWordRequest(id).then(_ => {
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Delete word</DialogTitle>
            <DialogContent>
                <br />
                <p>Are you sure you want to delete this word?</p>
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={deleteWord}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
