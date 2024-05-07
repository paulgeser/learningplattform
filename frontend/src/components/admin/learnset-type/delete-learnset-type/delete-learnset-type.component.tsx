import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { deleteLearnSetTypeRequest } from "../../../../core/services/learnset-type.service";
import { useSnackbar } from "notistack";



interface Props {
    open: boolean;
    onClose: () => void;
    id: string;
}

export const DeleteLearnSetTypeDialogComponent: React.FC<Props> = ({ onClose, open, id }): React.ReactElement => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const deleteLearnSetType = () => {
        deleteLearnSetTypeRequest(id).then(response => {
            if (response) {
                enqueueSnackbar('Successfully deleted learnset type!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during learnset type deletion...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
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
