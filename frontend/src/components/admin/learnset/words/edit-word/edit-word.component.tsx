import React, { useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";

import { updateLearnSetWordRequest } from "../../../../../services/learnset-word.service";
import { LearnSetWord } from "../../../../model/learnset-word.model";


interface Props {
    open: boolean
    onClose: () => void;
    id: string;
    learnSetId: string;
    malagasy: string;
    french: string;
    english: string;
    previewImage: string;
    previewAudio: string;
    setMalagasy: React.Dispatch<React.SetStateAction<string>>;
    setFrench: React.Dispatch<React.SetStateAction<string>>;
    setEnglish: React.Dispatch<React.SetStateAction<string>>;
    setPreviewImage: React.Dispatch<React.SetStateAction<string>>;
    setPreviewAudio: React.Dispatch<React.SetStateAction<string>>;
}

export const EditLearnSetWordDialogComponent: React.FC<Props> = ({ onClose, open, id, learnSetId, malagasy, setMalagasy, french, setFrench, english, setEnglish, previewImage, setPreviewImage, previewAudio, setPreviewAudio }): React.ReactElement => {

    const [selectedImageFile, setSelectedImageFile] = useState<File>();
    const [selectedAudioFile, setSelectedAudioFile] = useState<File>();

    const handleClose = () => {
        onClose();
    };

    const updateWord = () => {
        if (previewAudio && previewImage && malagasy && french && english) {
            const data: LearnSetWord = {
                _id: id,
                malagasy: malagasy,
                french: french,
                english: english,
                learnSetId: learnSetId,
                audio: previewAudio,
                picture: previewImage
            }
            updateLearnSetWordRequest(data).then(_ => {
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
            <DialogTitle>Update word</DialogTitle>
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
                    <Button variant="contained" onClick={updateWord}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
