import React from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useSnackbar } from "notistack";
import { deleteUserRequest } from "../../../../core/services/user.service";



interface Props {
    open: boolean;
    onClose: () => void;
    username: string;
}

export const DeleteUserDialogComponent: React.FC<Props> = ({ onClose, open, username }): React.ReactElement => {

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const deleteLearnSetType = () => {
        deleteUserRequest(username).then(response => {
            if (response) {
                enqueueSnackbar('Successfully deleted user!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during user deletion...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Delete app user</DialogTitle>
            <DialogContent>
                <br />
                <p>Are you sure you want to delete this user?</p>
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={deleteLearnSetType}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
