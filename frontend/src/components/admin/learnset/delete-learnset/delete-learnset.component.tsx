import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { deleteLearnSetRequest } from "../../../../core/services/learnset.service";
import { useSnackbar } from "notistack";



interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteLearnSetDialogComponent: React.FC<Props> = ({ onClose, open, id }): React.ReactElement => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const deleteLearnSet = () => {
        deleteLearnSetRequest(id).then(response => {
            if (response) {
                enqueueSnackbar('Successfully deleted learnset!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during learnset deletion...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
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
