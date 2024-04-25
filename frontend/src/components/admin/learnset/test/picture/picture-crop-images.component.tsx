import React, { useState, useEffect } from "react";

import Cropper from "react-cropper";
import { Box, Button, FormControl, IconButton, InputLabel, List, ListItemText, MenuItem, Select, SelectChangeEvent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { ProgressAndDataModel } from "./picture-home.component";
import { Word } from "../../../../model/word.model";
import { ImageWordInputModel } from "../../../../model/image-word-input.model";
import { addPictureToWord, updateStatusOfLearnSet } from "../../../../../services/learnset.service";
import { LearnSetStatus } from "../../../../model/status.enum";
import { useNavigate } from "react-router-dom";

interface Props {
    learnSetId: string;
    progressAndData: ProgressAndDataModel;
    setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
    words: Word[];
}


export const PictureCropImagesComponent: React.FC<Props> = ({ progressAndData, setProgressAndData, words, learnSetId }) => {
    const [raw, setRaw] = useState<string | undefined>();
    const [cropper, setCropper] = useState<Cropper>();
    const [croppedImages, setCroppedImages] = useState<CroppedImageModel[]>([])
    const [editingExisting, setEditingExisting] = useState<number>(-1);
    const [cropperEdit, setCropperEdit] = useState<boolean>(true);
    const navigate = useNavigate();


    const handleImageCrop = () => {
        if (cropper && cropperEdit) {
            cropper.getCroppedCanvas().toBlob((blobValue: Blob | null) => {
                if (blobValue) {
                    const img = cropper.getCroppedCanvas().toDataURL();
                    const copyCroppedImages = [...croppedImages];
                    if (editingExisting === -1) {
                        copyCroppedImages.push({
                            blob: blobValue,
                            dataUrl: img,
                            cropBoxData: {
                                left: cropper.getCropBoxData().left,
                                top: cropper.getCropBoxData().top,
                                width: cropper.getCropBoxData().width,
                                height: cropper.getCropBoxData().height,
                                imageHeight: cropper.getCanvasData().naturalHeight,
                                imageWidth: cropper.getCanvasData().naturalWidth
                            },
                            wordId: ''
                        });
                    } else {
                        copyCroppedImages[editingExisting].blob = blobValue;
                        copyCroppedImages[editingExisting].dataUrl = img;
                        copyCroppedImages[editingExisting].cropBoxData = {
                            left: cropper.getCropBoxData().left,
                            top: cropper.getCropBoxData().top,
                            width: cropper.getCropBoxData().width,
                            height: cropper.getCropBoxData().height,
                            imageHeight: cropper.getCanvasData().naturalHeight,
                            imageWidth: cropper.getCanvasData().naturalWidth
                        }
                        setEditingExisting(-1);
                    }

                    setCroppedImages(copyCroppedImages);

                    cropper.setCropBoxData({
                        height: cropper.getCanvasData().height,
                        left: cropper.getCanvasData().left,
                        top: cropper.getCanvasData().top,
                        width: cropper.getCanvasData().width
                    });
                }
                setCropperEditMode(false);
            });
        } else {
            console.error("Cropper is not defined!");
        }
    };

    const setCropperEditMode = (value: boolean) => {
        setCropperEdit(value);
        if (value) {
            cropper?.enable();
        } else {
            cropper?.disable();
        }
    }

    const changeCroppedImageAttribute = (attribute: 'wordId', value: string, index: number) => {
        const copyCroppedImages = [...croppedImages];
        copyCroppedImages[index][attribute] = value;
        setCroppedImages(copyCroppedImages);
    }

    const deleteCroppedImage = (index: number) => {
        const copyCroppedImages = [...croppedImages];
        copyCroppedImages.splice(index, 1);
        setCroppedImages(copyCroppedImages);
    }

    const handleSetCrop = (data: CroppedImageModel, index: number) => {
        if (cropper) {
            setCropperEditMode(true);
            cropper.setCropBoxData(data.cropBoxData);
            setEditingExisting(index);
        }
    }

    const createNewCrop = () => {
        if (cropper) {
            setCropperEditMode(true);
            cropper.setCropBoxData({
                height: cropper.getCanvasData().height,
                left: cropper.getCanvasData().left,
                top: cropper.getCanvasData().top,
                width: cropper.getCanvasData().width
            });
            setEditingExisting(-1);
        }
    }

    const startUpload = async () => {
        console.log('start upload');
        const data: ImageWordInputModel[] = [];
        croppedImages.forEach(image => {
            data.push({
                wordId: String(image.wordId),
                picture: image.dataUrl
            })
        })
        console.log(data);
        for (const word of data) {
            const response = await addPictureToWord(word);
            console.log(response);
        }

        await updateStatusOfLearnSet(learnSetId, LearnSetStatus.DRAFT);

        navigate('/admin');
    }

    useEffect(() => {
        if (progressAndData.previewString) {
            setRaw(String(progressAndData.previewString));
        }
    }, [progressAndData.previewString]);

    return (
        <div>
            {raw && (
                <div style={{ marginTop: '30px' }}>
                    <div style={{ marginBottom: '10px' }}>
                        {cropperEdit && (
                            <div>
                                <CheckIcon />
                                Edit is enabled
                            </div>
                        )}
                        {!cropperEdit && (
                            <div>
                                <CloseIcon />
                                Edit is disabled
                            </div>
                        )}

                    </div>
                    <div>
                        <Cropper style={{ width: "auto", height: "auto" }} zoomTo={0.5} initialAspectRatio={1}
                            src={raw} viewMode={1} minCropBoxHeight={10} minCropBoxWidth={10}
                            background={false} responsive={true} autoCropArea={1} checkOrientation={false}
                            onInitialized={(instance) => setCropper(instance)} guides={true} />
                    </div>
                    <div>
                        <Button onClick={handleImageCrop} disabled={!cropperEdit} variant="outlined">Crop image</Button>
                        <div>
                            <div>
                                <IconButton onClick={createNewCrop} aria-label="delete" size="large">
                                    <p>Add new crop</p>
                                    <AddIcon />
                                </IconButton>

                            </div>
                        </div>
                        <div>
                            {croppedImages.length !== 0 && (
                                <div>
                                    <Box sx={{ width: '100%' }}>
                                        <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '500px' }}>
                                            <Table sx={{ width: '100%' }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Word</TableCell>
                                                        <TableCell>Image</TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {croppedImages.map((imageItem, i) => (
                                                        <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }}
                                                            className={i === editingExisting ? 'border border-4 border-solid border-sky-600 rounded-md' : ''} >
                                                            <TableCell component="th" scope="row">
                                                                <FormControl fullWidth>
                                                                    <InputLabel>Word</InputLabel>
                                                                    <Select
                                                                        value={imageItem.wordId}
                                                                        label="Word"
                                                                        onChange={(event: SelectChangeEvent) => changeCroppedImageAttribute('wordId', event.target.value, i)}
                                                                    >
                                                                        {words.map(word => (<MenuItem key={word._id} value={word._id}>{word.english} / {word.malagasy}</MenuItem>))}
                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <img src={imageItem.dataUrl} style={{ maxHeight: "200px", maxWidth: "200px" }} alt="preview" />
                                                            </TableCell>
                                                            <TableCell align="right">
                                                                <IconButton onClick={() => { handleSetCrop(imageItem, i) }} aria-label="delete" size="large">
                                                                    <EditIcon />
                                                                </IconButton>
                                                                <IconButton onClick={() => { deleteCroppedImage(i) }} aria-label="delete" size="large">
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Box>
                                </div>
                            )}
                            {croppedImages.length === 0 && (
                                <div className="w-full flex flex-col items-center mt-6">
                                    <p>No image cropped yet, crop your first image!</p>
                                </div>
                            )}
                        </div>
                    </div>
                    <Button variant="contained" disabled={words.filter(word => !croppedImages.find(x => x.wordId === word._id)).length !== 0} onClick={startUpload}>
                        Continue
                    </Button>
                    <div>
                        Not used words yet:
                        <List>
                            {words.filter(word => !croppedImages.find(x => x.wordId === word._id)).map(word => (<ListItemText key={word._id} primary={`${word.english} / ${word.malagasy}`} />))}
                        </List>
                    </div>
                </div>
            )}
        </div>
    );
}


export interface CroppedImageModel {
    blob: Blob;
    dataUrl: string;
    cropBoxData: {
        left: number;
        top: number;
        width: number;
        height: number;
        imageHeight: number;
        imageWidth: number;
    };
    wordId: string | undefined;
}