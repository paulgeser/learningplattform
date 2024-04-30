import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { CreateLearnSetWord } from "../../../../../core/model/create-learnset-word.model";
import { createLearnSetWordRequest } from "../../../../../core/services/learnset-word.service";


interface Props {
    open: boolean
    onClose: () => void;
    learnsetId: string;
}

export const CreateLearnSetWordDialogComponent: React.FC<Props> = ({ onClose, open, learnsetId }): React.ReactElement => {

    const [malagasy, setMalagasy] = useState<string>("");
    const [french, setFrench] = useState<string>("");
    const [english, setEnglish] = useState<string>("");

    const [selectedImageFile, setSelectedImageFile] = useState<File>();
    const [previewImage, setPreviewImage] = useState<string>();

    const [selectedAudioFile, setSelectedAudioFile] = useState<File>();
    const [previewAudio, setPreviewAudio] = useState<string>();

    useEffect(() => {

    }, []);


    const handleClose = () => {
        onClose();
    };

    const createWord = () => {
        if (previewAudio && previewImage && malagasy && french && english && learnsetId) {
            const data: CreateLearnSetWord = {
                malagasy: malagasy,
                french: french,
                english: english,
                learnSetId: learnsetId,
                audio: previewAudio,
                picture: previewImage
            }
            createLearnSetWordRequest(data).then(_ => {
                onClose();
            });
        }
    }

    const changeImageFileHandler = (event: any) => {
        setSelectedImageFile(event.target.files[0]);
        if (event.target.files || event.target.files.length !== 0) {
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewImage(reader.result);
                }
            }

        }
    };
    const changeAudioFileHandler = (event: any) => {
        setSelectedAudioFile(event.target.files[0]);
        if (event.target.files || event.target.files.length !== 0) {
            let reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setPreviewAudio(reader.result);
                }
            }

        }
    };


    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Create a new word</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="malagasy-field" label="Malagasy" variant="outlined" type="text" fullWidth value={malagasy} onChange={(e) => setMalagasy(e.target.value)} />
                <br />
                <br />
                <TextField id="french-field" label="French" variant="outlined" type="text" fullWidth value={french} onChange={(e) => setFrench(e.target.value)} />
                <br />
                <br />
                <TextField id="english-field" label="English" variant="outlined" type="text" fullWidth value={english} onChange={(e) => setEnglish(e.target.value)} />
                <br />
                <br />
                <Button
                    component="label"
                    variant="outlined"
                >
                    Upload picture File
                    <input
                        onChange={changeImageFileHandler}
                        type="file"
                        hidden
                        accept=".jpg,.jpeg,.png"
                    />
                </Button>
                {previewImage && (
                    <img src={previewImage} style={{ maxHeight: "80%", maxWidth: "80%" }} className="my-5 border border-gray-400 rounded-lg" alt="preview of uploaded file" />
                )}
                <br />
                <br />
                <Button
                    component="label"
                    variant="outlined"
                >
                    Upload audio file
                    <input
                        onChange={changeAudioFileHandler}
                        type="file"
                        hidden
                        accept=".mp3,.m4a,.flac"
                    />
                </Button>
                {previewAudio && (
                    <audio controls src={previewAudio} />
                )}
                <div>
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createWord}>Create</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
