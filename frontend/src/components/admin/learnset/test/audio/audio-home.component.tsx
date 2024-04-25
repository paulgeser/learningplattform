import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLearnSetById, getWordsByLearnSetId } from '../../../../../services/learnset.service';
import { LearnSet } from '../../../../model/learnset.model';
import { Word } from '../../../../model/word.model';
import WaveSurfer from 'wavesurfer.js';
import { useWavesurfer } from '@wavesurfer/react';

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

    /* const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log((event as any).target.result)
        if (event.target.files && event.target.files.length > 0 && event.target) {
            /* const reader = new FileReader();
            reader.onload = function (event) {
                const base64String = event.target.result.split(',')[1];
                console.log(base64String);
            };
            reader.readAsDataURL(file);
            var reader = new FileReader();
            reader.onload = function (eventT) {
                if (eventT.target && eventT.target.result && typeof eventT.target.result === 'string') {
                    var data = eventT.target.result.split(',')
                    var decodedImageData = btoa(data[1]);                    // the actual conversion of data from binary to base64 format
                    console.log(decodedImageData, data[0], btoa(data[1]));
                }
            };
            reader.readAsDataURL(event.target.files[0]);
        } else {
            alert('Please select an MP3 file.');
        }
    }; */



    const [audioFile, setAudioFile] = useState<any>(null);

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            setAudioFile(file);
        }
    }

    const waveformRef = useRef<any>();

    let wavesurfer = null;

    const initializeWaveform = () => {
        console.log(waveformRef.current);
        if (waveformRef.current) {
            const wavesurfer = WaveSurfer.create({
                container: waveformRef.current,
            });
            console.log(wavesurfer);
        }

        /* wavesurfer = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: 'violet',
            progressColor: 'purple',
            cursorWidth: 1,
            barWidth: 2,
            height: 200
        }); */


/*         wavesurfer.load(audioFile);
 */    };

    const handleCut = () => {
        console.log("test");
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFileInputChange(e)} />
                    </div>
                    {/* {progressAndData.progress === 0 && (
                        <PicturesFileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                    {progressAndData.progress === 1 && (
                        <PictureCropImagesComponent learnSetId={String(id)}  progressAndData={progressAndData} setProgressAndData={setProgressAndData} words={words} />
                    )} */}
                    <div>
                        <div ref={waveformRef} style={{ width: '100%', height: '200px' }} />
                        <button onClick={initializeWaveform}>Load Audio</button>
                        <button onClick={handleCut}>Cut Selected Portion</button>
                    </div>
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