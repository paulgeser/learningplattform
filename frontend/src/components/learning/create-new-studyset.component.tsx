import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import { StudySetType } from "../../core/enum/studyset-type.enum";
import { getAllLearnSets } from "../../core/services/learnset.service";
import { LearnSet } from "../../core/model/learnset.model";



interface Props {
    open: boolean;
    onClose: () => void;
    studySetType: StudySetType;
}

export const CreateNewStudySetComponent: React.FC<Props> = ({ onClose, open, studySetType }): React.ReactElement => {

    const [attempts, setAttempts] = useState<number>(2);
    const [queryLearnSets, setQueryLearnSets] = useState<LearnSet[]>([]);
    const [selectedLearnSets, setSelectedLearnSets] = useState<LearnSet[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getLearnSetsWithQuery();
    }, []);

    const getLearnSetsWithQuery = () => {
        getAllLearnSets().then(response => {
            if (response) {
                setQueryLearnSets(response.data);
            }
        });
    }


    const handleClose = () => {
        onClose();
    };

    const createLearnSetType = () => {
        /* createLearnSetTypeRequest({ name: name, description: description }).then(response => {
            if (response) {
                enqueueSnackbar('Successfully created learnset type!', {
                    autoHideDuration: 6000,
                    variant: "success"
                });
            } else {
                enqueueSnackbar('Failure during learnset type creation...', {
                    autoHideDuration: 6000,
                    variant: "error"
                });
            }
            onClose();
            setName("");
            setDescription("");
        }); */
    }

    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="lg">
            <DialogTitle>Create new study set ({studySetType})</DialogTitle>
            <DialogContent>
                <div>Selected learnsets:</div>
                <div>
                    {selectedLearnSets.length !== 0 && (
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Week</TableCell>
                                            <TableCell>Chapter</TableCell>
                                            <TableCell>Type</TableCell>
                                            <TableCell>Unique ID</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {queryLearnSets.map((learnSetItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell align="left">
                                                    {learnSetItem.name}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnSetItem.week}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnSetItem.chapter}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnSetItem.type.name}
                                                </TableCell>
                                                <TableCell align="left" width="200px">
                                                    {learnSetItem._id}
                                                </TableCell>
                                                <TableCell align="left" width="200px">
                                                    <Button variant="outlined">Add learnset</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                    {selectedLearnSets.length === 0 && (<>
                        <p>No learnset selected yet!</p>
                    </>)}
                </div>
                <br />
                <p>Select learn sets</p>
                <div>
                    <Box sx={{ width: '100%' }}>
                        <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Week</TableCell>
                                        <TableCell>Chapter</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Unique ID</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {queryLearnSets.map((learnSetItem, i) => (
                                        <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                            <TableCell align="left">
                                                {learnSetItem.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {learnSetItem.week}
                                            </TableCell>
                                            <TableCell align="left">
                                                {learnSetItem.chapter}
                                            </TableCell>
                                            <TableCell align="left">
                                                {learnSetItem.type.name}
                                            </TableCell>
                                            <TableCell align="left" width="200px">
                                                {learnSetItem._id}
                                            </TableCell>
                                            <TableCell align="left" width="200px">
                                                <Button variant="outlined">Add learnset</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </div>

                <TextField id="attemps-for-success-field" label="Count of attemps need to succeed" variant="outlined" type="text" fullWidth value={attempts} onChange={(e) => setAttempts(Number(e.target.value))} autoComplete='off' />
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
