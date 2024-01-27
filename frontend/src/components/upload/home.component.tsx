import React, { useState } from 'react';
import { CroppedImageModel, FileCropTextComponent } from './file-crop-text.component';
import { FileUploadComponent } from './file-upload.component';
import { Box, Breadcrumbs, Button, Link, Step, StepButton, Stepper, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { TextAnalysisComponent } from './text-analysis-review.component';
import { useParams } from 'react-router-dom';

const steps = ['Text', 'Images', 'Audio', 'Review'];

export const UploadHomeComponent: React.FC = (): React.ReactElement => {
    const [progressAndData, setProgressAndData] = useState<ProgressAndDataModel>({
        progress: 1,
        text: {
            progress: 0,
            previewString: null,
            croppedImages: []
        },
        image: {
            progress: 0,
            previewString: null
        }
    });

    let { id } = useParams();

    console.log(id);

    const startProcess = () => {
        setProgressAndData({ ...progressAndData, progress: 2 })
    }

    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
    }>({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? // It's the last step, but not all steps have been completed,
                // find the first step that has been completed
                steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }} >
            <div style={{ maxWidth: '1400px', width: '100%', marginTop: '30px' }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={completed[index]}>
                            <StepButton color="inherit" onClick={handleStep(index)}>
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
                {activeStep === 0 && (<React.Fragment>
                    {progressAndData.text.progress === 0 && (
                        <FileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} fileType='text' />
                    )}
                    {progressAndData.text.progress === 1 && (
                        <FileCropTextComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                    {progressAndData.text.progress === 2 && (
                        <TextAnalysisComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                    )}
                </React.Fragment>)}
            </div>
        </div>
    );
}

export interface ProgressAndDataModel {
    progress: number;
    text: {
        progress: number;
        previewString: string | null;
        croppedImages: CroppedImageModel[];
    }
    image: {
        progress: number;
        previewString: string | null;
    }
}