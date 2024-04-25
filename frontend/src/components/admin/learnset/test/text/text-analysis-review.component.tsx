/* import React, { useEffect, useState } from 'react';
import { ProgressAndDataModel } from './text-home.component';
import { Button, LinearProgress, TextField } from '@mui/material';
import { AnalyzedWordsModel } from '../../../../model/analyzed-words.model';
import { saveAnalyzedWords } from '../../../../../services/learnset.service';
import { useNavigate } from 'react-router-dom';


interface Props {
    learnSetId: string
    progressAndData: ProgressAndDataModel;
    setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
}

var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const TextAnalysisComponent: React.FC<Props> = ({ learnSetId, progressAndData, setProgressAndData }): React.ReactElement => {

    const [imageUrl, setImageUrl] = useState<string>();
    const [analyzedContent, setAnalyzedContent] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (progressAndData.blob && progressAndData.croppedImg) {
            setImageUrl(progressAndData.croppedImg);
            startAnalysis(progressAndData.blob).then(x => {
                console.log(x)
            });
        }
    }, [progressAndData.blob]);

    const startAnalysis = async (croppedImageBlob: Blob) => {
        const text: string[] = await analyzeBlobItem(croppedImageBlob);

        setAnalyzedContent(text.join('\n'));
        setLoading(false);
    }

    const analyzeBlobItem = (item: Blob): Promise<any> => {
        const formData = new FormData();
        var file = new File([item], "image.png", {
            lastModified: new Date().getTime(),
            type: item.type,
        });
        formData.append('file', file)
        const requestOptions = {
            method: 'POST',
            body: formData
        };
        return fetch(`${url}/analysis/image`, requestOptions)
            .then(response => response.json())
            .catch(error => console.warn(error));
    }

    const changeAnalyzedText = (text: string) => {
        setAnalyzedContent(text);
    }

    const nextStep = () => {
        const data: AnalyzedWordsModel[] = [];

        analyzedContent.split('\n').forEach((splitString: string) => {
            const lineSplit = splitString.split(';');
            data.push({
                malagasy: lineSplit[0].trim(),
                english: lineSplit[1].trim()
            })
        });

        saveAnalyzedWords(learnSetId, data).then(value => {
            console.log(value);
            navigate('/admin');
        })

    }

    return (
        <div>
            {loading && (
                <div style={{ marginTop: '20px' }}>
                    <LinearProgress />
                    <div>
                        Analyzing images...
                    </div>
                </div>
            )}
            {!loading && (
                <div >
                    <div style={{ display: 'flex', flexDirection: 'row', marginTop: "50px" }}>
                        <img src={imageUrl} style={{ maxHeight: "800px", maxWidth: "600px" }} alt="cropped-preview" />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Analyzed text"
                            multiline
                            value={analyzedContent}
                            style={{ width: '100%' }}
                            onChange={(e) => changeAnalyzedText(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button onClick={nextStep} variant='outlined'>Next step</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
 */
const test = {}
export default test;