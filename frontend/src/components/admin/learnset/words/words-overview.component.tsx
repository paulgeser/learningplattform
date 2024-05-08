import React, { useEffect, useState } from "react";


import './words-overview.component.css';
import { Button, Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Tooltip } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import SpatialAudioIcon from '@mui/icons-material/SpatialAudio';
import { useNavigate, useParams } from "react-router-dom";
import { getAllWordsByLearnsetId } from "../../../../core/services/learnset-word.service";
import { LearnSetWord } from "../../../../core/model/learnset-word.model";
import { CreateLearnSetWordDialogComponent } from "./create-word/create-word.component";
import { DeleteLearnSetWordDialogComponent } from "./delete-word/delete-word.component";
import { EditLearnSetWordDialogComponent } from "./edit-word/edit-word.component";
import { getAllLearnSetById } from "../../../../core/services/learnset.service";
import { LearnSet } from "../../../../core/model/learnset.model";


export const WordsOverviewComponent: React.FC = (): React.ReactElement => {

    let { id } = useParams();
    const navigate = useNavigate();

    const [learnSetWords, setLearnSetWords] = useState<LearnSetWord[]>([]);
    const [learnSet, setLearnSet] = useState<LearnSet>();
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
        getWords();
        if (id) {
            getAllLearnSetById(id).then(response => {
                if (response && response.status === 200) {
                    setLearnSet(response.data);
                }
            })
        }
    }, []);

    const getWords = () => {
        if (id) {
            getAllWordsByLearnsetId(id).then(response => {
                if (response) {
                    setLearnSetWords(response.data);
                }
            });
        }
    }

    const onCloseCreateDialog = () => {
        setCreateLearnsetWordDialog(false);
        getWords();
    }

    const onCloseEditDialog = () => {
        setEditId("");
        setEditMalagasy("");
        setEditFrench("");
        setEditEnglish("");
        setEditPicture("")
        setEditAudio("");
        setEditLearnsetWordDialog(false);
        getWords();
    }

    const onCloseDeleteDialog = () => {
        setDeleteId("");
        setDeleteLearnsetWordDialog(false);
        getWords();
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
                        Words of: {learnSet?.name}

                        <div className="ml-3">
                            <Button variant='outlined' onClick={() => setCreateLearnsetWordDialog(true)}>Create a new word</Button>
                            <Button variant='outlined' onClick={() => navigate('/admin/learnset-overview')}>Back to overview</Button>
                        </div>
                    </div>

                    <div>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '80vh' }}>
                                <Table sx={{ width: '100%' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Malagasy</TableCell>
                                            <TableCell>French</TableCell>
                                            <TableCell>English</TableCell>
                                            <TableCell>Unique ID</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {learnSetWords.map((learnsetWordItem, i) => (
                                            <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                                <TableCell align="left">
                                                    {learnsetWordItem.malagasy}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetWordItem.french}
                                                </TableCell>
                                                <TableCell align="left">
                                                    {learnsetWordItem.english}
                                                </TableCell>
                                                <TableCell align="left" width="200px">
                                                    {learnsetWordItem._id}
                                                </TableCell>
                                                <TableCell align="right" width="200px">
                                                    {learnsetWordItem.picture && (
                                                        <Tooltip title="Image for word stored">
                                                            <ImageIcon color="success" />
                                                        </Tooltip>
                                                    )}
                                                    {!learnsetWordItem.picture && (
                                                        <Tooltip title="No image for word stored">
                                                            <ImageIcon color="error" />
                                                        </Tooltip>
                                                    )}
                                                    {learnsetWordItem.audio && (
                                                        <Tooltip title="Audio for word stored">
                                                            <SpatialAudioIcon color="success" />
                                                        </Tooltip>
                                                    )}
                                                    {!learnsetWordItem.audio && (
                                                        <Tooltip title="No audio for word stored">
                                                            <SpatialAudioIcon color="error" />
                                                        </Tooltip>
                                                    )}

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
                        <EditLearnSetWordDialogComponent onClose={onCloseEditDialog} open={editLearnsetWordDialog}
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