import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLearnSetById, getWordsByLearnSetId } from '../../../../services/learnset.service';
import { LearnSet } from '../../../model/learnset.model';
import { Word } from '../../../model/word.model';

export const AudioHomeComponent: React.FC = (): React.ReactElement => {
    const [progressAndData, setProgressAndData] = useState<ProgressAndDataModel>({
        progress: 0,
        previewString: null,
        croppedImg: null,
        blob: null
    });
    const [words, setWords] = useState<Word[]>([]);

    const [learnSet, setLearnSet] = useState<LearnSet>();

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getLearnSetById(id).then(value => {
                setLearnSet(value);
            });
            getWordsByLearnSetId(id).then(value => {
                setWords(value);
            });
        }
    }, []);

    const onFileAdded = (fileList: FileList | null) => {
        if (fileList) {
            //this.props.onFileAdded(fileList[0])
            console.log(fileList[0], fileList);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div style={{ maxWidth: '1400px', width: '100%', marginTop: '30px' }}>
                <div>{learnSet?.name}</div>
                <React.Fragment>
                    <div className="fileInputWrapper">
                        <input
                            id="file-input"
                            type="file"
                            name="fileInput"
                            accept="audio/*"
                            onChange={(e) => onFileAdded(e.target.files)} />
                    </div>
                    {/* {progressAndData.progress === 0 && (
                        <PicturesFileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                    {progressAndData.progress === 1 && (
                        <PictureCropImagesComponent learnSetId={String(id)}  progressAndData={progressAndData} setProgressAndData={setProgressAndData} words={words} />
                    )} */}
                </React.Fragment>
            </div>
        </div>
    );
}

export interface ProgressAndDataModel {
    progress: number;
    previewString: null | string;
    croppedImg: null | string;
    blob: null | Blob;
}