import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { createLearnSetTypeRequest } from "../../../../services/learnset-type.service";



interface Props {
    open: boolean;
    onClose: () => void;
}

export const CreateLearnSetTypeDialogComponent: React.FC<Props> = ({ onClose, open }): React.ReactElement => {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    const handleClose = () => {
        onClose();
    };

    const createLearnSetType = () => {
        createLearnSetTypeRequest({ name: name, description: description }).then(_ => {
            onClose();
        });
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create new learnset type</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="name-field" label="Name" variant="outlined" type="text" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
                <br />
                <br />
                <TextField id="description-field" label="Description" variant="outlined" type="text" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} />
                <br />
                <br />
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createLearnSetType}>Create</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
