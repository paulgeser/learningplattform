import React, { useState } from 'react';
import { FileCropTextComponent } from './file-crop-text.component';
import { FileUploadComponent } from './file-upload.component';
import { Box, Breadcrumbs, Button, Link, Step, StepButton, Stepper, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const steps = ['Text', 'Images', 'Audio', 'Review'];

export const UploadHomeComponent: React.FC = (): React.ReactElement => {

    const [progressAndData, setProgressAndData] = useState<ProgressAndDataModel>({
        progress: 1,
        text: {
            progress: 0,
            previewString: null
        },
        image: {
            progress: 0,
            previewString: null
        }
    });

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
                </React.Fragment>)}
                <React.Fragment>
                    
                    {/* 
                    <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                        Step {activeStep + 1}
                    </Typography>
                    <Box>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                        </Button>
                        {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                    Step {activeStep + 1} already completed
                                </Typography>
                            ) : (
                                <Button onClick={handleComplete}>
                                    {completedSteps() === totalSteps() - 1
                                        ? 'Finish'
                                        : 'Complete Step'}
                                </Button>
                            ))}
                    </Box> */}
                </React.Fragment>
                {/* {progressAndData.progress === 1 && (<div>
                    This is home
                    <Button onClick={startProcess}>Here go to start the process</Button>
                </div>)}
                {progressAndData.progress === 2 && (<div>
                    <FileUploadComponent progressAndData={progressAndData} setProgressAndData={setProgressAndData} />
                </div>)}
                {progressAndData.progress === 3 && (<div>
                    <FileCropComponent />
                </div>)} */}
            </div>
        </div>
    );
}

export interface ProgressAndDataModel {
    progress: number;
    text: {
        progress: number;
        previewString: string | null;
    }
    image: {
        progress: number;
        previewString: string | null;
    }
}