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
    const [previewImage, setPreviewImage] = useState<string>("");

    const [selectedAudioFile, setSelectedAudioFile] = useState<File>();
    const [previewAudio, setPreviewAudio] = useState<string>("");

    useEffect(() => {

    }, []);


    const handleClose = () => {
        onClose();
    };

    const createWord = () => {
        console.log('in func')
        if (malagasy && french && english && learnsetId) {
            console.log('in if')
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
                setMalagasy("");
                setFrench("");
                setEnglish("");
                setSelectedAudioFile(undefined);
                setSelectedImageFile(undefined);
                setPreviewAudio("");
                setPreviewImage("");
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
        event.target.value = "";
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
        event.target.value = "";
    };


    return (
        <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
            <DialogTitle>Create a new word</DialogTitle>
            <DialogContent>
                <TextField style={{ marginTop: '15px' }} id="malagasy-field" label="Malagasy" variant="outlined" type="text" fullWidth value={malagasy} onChange={(e) => setMalagasy(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField id="french-field" label="French" variant="outlined" type="text" fullWidth value={french} onChange={(e) => setFrench(e.target.value)} autoComplete='off' />
                <br />
                <br />
                <TextField id="english-field" label="English" variant="outlined" type="text" fullWidth value={english} onChange={(e) => setEnglish(e.target.value)} autoComplete='off' />
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
                {previewImage && (<>
                    <img src={previewImage} style={{ maxHeight: "80%", maxWidth: "80%" }} className="my-5 border border-gray-400 rounded-lg" alt="preview of uploaded file" />
                    <Button
                        component="label"
                        variant="outlined"
                        onClick={() => setPreviewImage("")}
                    >
                        Remove picture
                    </Button>
                </>
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
                {previewAudio && (<>
                    <audio controls src={previewAudio} />
                    <Button
                        component="label"
                        variant="outlined"
                        onClick={() => setPreviewAudio("")}
                    >
                        Remove audio
                    </Button>
                </>
                )}
                <div className="mt-3">
                    <Button variant="outlined" onClick={() => onClose()}>Cancel</Button>
                    <Button variant="contained" onClick={createWord}>Create</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
