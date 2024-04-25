/* import React, { useEffect, useState } from 'react';
import { FileCropTextComponent } from './file-crop-text.component';
import { TextAnalysisComponent } from './text-analysis-review.component';
import { useParams } from 'react-router-dom';
import { TextFileUploadComponent } from './text-file-upload.component';
import { getLearnSetById } from '../../../../../services/learnset.service';
import { LearnSet } from '../../../../model/learnset.model';

export const TextHomeComponent: React.FC = (): React.ReactElement => {
    const [progressAndData, setProgressAndData] = useState<ProgressAndDataModel>({
        progress: 0,
        previewString: null,
        croppedImg: null,
        blob: null
    });

    const [learnSet, setLearnSet] = useState<LearnSet>();

    let { id } = useParams();

    useEffect(() => {
        if (id) {
            getLearnSetById(id).then(value => {
                console.log(value);
                setLearnSet(value);
            })
        }
    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div style={{ maxWidth: '1400px', width: '100%', marginTop: '30px' }}>
                <div>{learnSet?.name}</div>
                <React.Fragment>
                    {progressAndData.progress === 0 && (
                        <TextFileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} fileType='text' />
                    )}
                    {progressAndData.progress === 1 && (
                        <FileCropTextComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                    {progressAndData.progress === 2 && (
                        <TextAnalysisComponent learnSetId={String(id)} progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
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
} */
const test = {}
export default test;