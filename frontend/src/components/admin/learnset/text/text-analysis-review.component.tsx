import React, { useEffect, useState } from 'react';
import { ProgressAndDataModel } from './text-home.component';
import { CroppedImageModel } from './file-crop-text.component';
import { Button, CircularProgress, LinearProgress, TextField } from '@mui/material';


interface Props {
    progressAndData: ProgressAndDataModel;
    setProgressAndData: React.Dispatch<React.SetStateAction<ProgressAndDataModel>>;
}

var url = '';
if (process.env.NODE_ENV !== 'production') {
    url = String(process.env.REACT_APP_SERVICE_URL);
}

export const TextAnalysisComponent: React.FC<Props> = ({ progressAndData, setProgressAndData }): React.ReactElement => {

    const [croppedImages, setCroppedImages] = useState<CroppedImageModel[]>([])
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (progressAndData.text.croppedImages.length > 0) {
            setCroppedImages(progressAndData.text.croppedImages);
            startAnalysis(progressAndData.text.croppedImages).then(x => {
                console.log(x)
            });
        }
    }, [progressAndData.text.croppedImages]);

    const startAnalysis = async (croppedImagesInput: CroppedImageModel[]) => {
        for (const croppedImage of croppedImagesInput) {
            const text: string[] = await analyzeBlobItem(croppedImage.blob);
            croppedImage.analyzedData = text.join('\n');
        }
        setCroppedImages(croppedImagesInput);
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

    const changeAnalyzedText = (index: number, text: string) => {
        const copyOfCroppedImages = [...croppedImages];
        copyOfCroppedImages[index].analyzedData = text;
        setCroppedImages(copyOfCroppedImages)
    }

    const nextStep = () => {
        const finalMappedData: any[] = [];
        croppedImages.forEach(x => {
            const data: any[] = []

            x.analyzedData.split('\n').forEach((xy: string) => {
                const lineSplit= xy.split(';');
                data.push({
                    malagasy: lineSplit[0].trim(),
                    english: lineSplit[1].trim()
                })
            })

            console.log(data);
            finalMappedData.push({
                text: data,
                name: x.title
            })
        })
        console.log(finalMappedData);
        localStorage.setItem('analyzedText', JSON.stringify(finalMappedData));
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
                <div>
                    {croppedImages.map((imageItem, i) => (
                        <div key={imageItem.dataUrl} style={{ display: 'flex', flexDirection: 'row', marginTop: "50px" }}>
                            <img src={imageItem.dataUrl} style={{ maxHeight: "800px", maxWidth: "600px" }} />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Analyzed text"
                                multiline
                                value={imageItem.analyzedData}
                                style={{ width: '100%' }}
                                onChange={(e) => changeAnalyzedText(i, e.target.value)}
                            />
                        </div>
                    ))}
                    <div>
                        <Button onClick={nextStep}>Next step</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
