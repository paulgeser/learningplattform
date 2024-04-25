import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLearnSetById, getWordsByLearnSetId } from '../../../../../services/learnset.service';
import { LearnSet } from '../../../../model/learnset.model';
import { PicturesFileUploadComponent } from './picture-file-upload.component';
import { PictureCropImagesComponent } from './picture-crop-images.component';
import { Word } from '../../../../model/word.model';

export const PictureHomeComponent: React.FC = (): React.ReactElement => {
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

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div style={{ maxWidth: '1400px', width: '100%', marginTop: '30px' }}>
                <div>{learnSet?.name}</div>
                <React.Fragment>
                    {progressAndData.progress === 0 && (
                        <PicturesFileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                    {progressAndData.progress === 1 && (
                        <PictureCropImagesComponent learnSetId={String(id)}  progressAndData={progressAndData} setProgressAndData={setProgressAndData} words={words} />
                    )}
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