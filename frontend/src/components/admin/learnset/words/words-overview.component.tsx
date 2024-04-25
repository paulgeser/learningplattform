import React, { useEffect, useState } from "react";


import './words-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from "react-router-dom";
import { getAllWordsByLearnsetId } from "../../../../services/learnset-word.service";
import { LearnSetWord } from "../../../model/learnset-word.model";
import { CreateLearnSetWordDialogComponent } from "./create-word/create-word.component";
import { DeleteLearnSetWordDialogComponent } from "./delete-word/delete-word.component";
import { EditLearnSetWordDialogComponent } from "./edit-word/edit-word.component";


export const WordsOverviewComponent: React.FC = (): React.ReactElement => {

    let { id } = useParams();

    const [learnSetWords, setLearnSetWords] = useState<LearnSetWord[]>([]);
    const [createLearnsetWordDialog, setCreateLearnsetWordDialog] = useState<boolean>(false);
    const [editLearnsetWordDialog, setEditLearnsetWordDialog] = useState<boolean>(false);
    const [deleteLearnsetWordDialog, setDeleteLearnsetWordDialog] = useState<boolean>(false);

    const [editId, setEditId] = useState<string>("");
    const [editMalagasy, setEditMalagasy] = useState<string>("");
    const [editFrench, setEditFrench] = useState<string>("");
    const [editEnglish, setEditEnglish] = useState<string>("");
    const [editPicture, setEditPicture] = useState<string>("");
    const [editAudio, setEditAudio] = useState<string>("");
    const [deleteId, setDeleteId] = useState<string>("");

    useEffect(() => {
        if (id) {
            getAllWordsByLearnsetId(id).then(values => {
                setLearnSetWords(values);
            });
        }
    }, []);

    const onCloseCreateDialog = () => {
        setCreateLearnsetWordDialog(false);
        if (id) {
            getAllWordsByLearnsetId(id).then(values => {
                setLearnSetWords(values);
            });
        }
    }

    const onCloseEditDialog = () => {
        setEditId("");
        setEditMalagasy("");
        setEditFrench("");
        setEditEnglish("");
        setEditPicture("")
        setEditAudio("");
        setEditLearnsetWordDialog(false);
        if (id) {
            getAllWordsByLearnsetId(id).then(values => {
                setLearnSetWords(values);
            });
        }
    }

    const onCloseDeleteDialog = () => {
        setDeleteId("");
        setDeleteLearnsetWordDialog(false);
        if (id) {
            getAllWordsByLearnsetId(id).then(values => {
                setLearnSetWords(values);
            });
        }
    }

    const handleEditClick = (word: LearnSetWord): void => {
        setEditId(word._id);
        setEditMalagasy(word.malagasy);
        setEditFrench(word.french);
        setEditEnglish(word.english);
        setEditPicture(word.picture)
        setEditAudio(word.audio);
        setEditLearnsetWordDialog(true);
    }

    return (
        <div>
            <div id="learnset-overview-outside-box">
                <div id="learnset-overview-content-box">
                    <div id="learnset-overview-title">
                        Words of learnset overview

                        <div className="ml-3">
                            <Button variant='outlined' onClick={() => setCreateLearnsetWordDialog(true)}>Create a new word</Button>
                        </div>
                    </div>

                    <div>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Unique ID</TableCell>
                                            <TableCell>Malagasy</TableCell>
                                            <TableCell>French</TableCell>
                                            <TableCell>English</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {learnSetWords.map((learnsetWordItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell component="th" scope="row">
                                                    {learnsetWordItem._id}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetWordItem.malagasy}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetWordItem.french}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetWordItem.english}
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Tooltip title="Edit learnset">
                                                        <IconButton aria-label="edit" size="large"
                                                            id="edit-button"
                                                            onClick={() => handleEditClick(learnsetWordItem)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete learnset">
                                                        <IconButton aria-label="delete" size="large"
                                                            id="delete-button"
                                                            onClick={() => { setDeleteId(learnsetWordItem._id); setDeleteLearnsetWordDialog(true) }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </div>
                </div>
                {id && (
                    <>
                        <CreateLearnSetWordDialogComponent onClose={onCloseCreateDialog} open={createLearnsetWordDialog} learnsetId={id} />
                        <EditLearnSetWordDialogComponent  onClose={onCloseEditDialog} open={editLearnsetWordDialog}
                        id={editId} learnSetId={id} malagasy={editMalagasy} setMalagasy={setEditMalagasy} french={editFrench} setFrench={setEditFrench}
                        english={editEnglish} setEnglish={setEditEnglish} previewImage={editPicture} setPreviewImage={setEditPicture}
                        previewAudio={editAudio} setPreviewAudio={setEditAudio} />
                        <DeleteLearnSetWordDialogComponent id={deleteId} onClose={onCloseDeleteDialog} open={deleteLearnsetWordDialog} />
                    </>
                )}

                {/* <CreateLearnSetDialogComponent onClose={onCloseCreateDialog} open={createLearnsetDialog} />
                <EditLearnSetDialogComponent onClose={onCloseEditDialog} open={editLearnsetDialog}
                    id={editId} name={editName} setName={setEditName} status={editStatus} setStatus={setEditStatus}
                    learnsetType={editLearnsetType} setLearnsetType={setEditLearnsetType}
                    week={editWeek} setWeek={setEditWeek} />
                 */}
            </div>
        </div>
    );
}