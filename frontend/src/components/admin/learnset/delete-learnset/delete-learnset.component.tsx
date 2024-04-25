import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { deleteLearnSetRequest } from "../../../../services/learnset.service";



interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteLearnSetDialogComponent: React.FC<Props> = ({ onClose, open, id }): React.ReactElement => {

    const handleClose = () => {
        onClose();
    };

    const deleteLearnSet = () => {
        deleteLearnSetRequest(id).then(_ => {
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Delete learnset</DialogTitle>
            <DialogContent>
                <br />
                <p>Are you sure you want to delete this learnset?</p>
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={deleteLearnSet}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
