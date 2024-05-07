import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { changePasswordRequest } from "../../../../core/services/user.service";

interface Props {
    open: boolean;
    onClose: () => void;
    username: string;
}

export const ChangeUserPasswordDialogComponent: React.FC<Props> = ({ open, onClose, username }): React.ReactElement => {

    const [firstPassword, setFirstPassword] = useState<string>("");
    const [secondPassword, setSecondPassword] = useState<string>("");
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const handleClose = () => {
        onClose();
    };

    const createUser = () => {
        if (firstPassword !== secondPassword) {
            setInvalidPassword(true);
        } else {
            setInvalidPassword(false);
            clearInputValues();
            changePasswordRequest(username, firstPassword).then(response => {
                if (response) {
                    enqueueSnackbar('Successfully updated password!', {
                        autoHideDuration: 6000,
                        variant: "success"
                    });
                } else {
                    enqueueSnackbar('Failure during password update...', {
                        autoHideDuration: 6000,
                        variant: "error"
                    });
                }
                onClose();
            });
        }
    }

    const clearInputValues = () => {
        setInvalidPassword(false);
        setFirstPassword("");
        setSecondPassword("");
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Change password of user</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="first-password-field" label="Password" variant="outlined" type="password" fullWidth value={firstPassword} onChange={(e) => setFirstPassword(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField style={{ marginTop: '15px' }} id="second-password-field" label="Confirm password" variant="outlined" type="password" fullWidth value={secondPassword} onChange={(e) => setSecondPassword(e.target.value)} autoComplete='off' />
                <br />
                <br />
                {invalidPassword && (
                    <div className="text-red-600 font-semibold">
                        Password either empty or both passwords don't match !!!
                    </div>
                )}

                <br />
                <div>
                    <Button variant="outlined" onClick={() => { onClose(); clearInputValues() }}>Cancel</Button>
                    <Button variant="contained" onClick={createUser}>Save edit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
