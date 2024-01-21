import React, { useState } from 'react';
import FileCropComponent from './file-crop.component';
import FileUploadComponent from './file-upload.component';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


export const UploadHomeComponent: React.FC = (): React.ReactElement => {

    const [progressAndData, setProgressAndData] = useState<ProgressAndDataModel>({ progress: 0, tempData: {}, finalData: {} });

    return (
        <div>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
            >
                <Link underline="hover" key="1" color="inherit" href="/">
                    MUI
                </Link>
                <Link
                    underline="hover"
                    key="2"
                    color="inherit"
                    href="/material-ui/getting-started/installation/"
                >
                    Core
                </Link>
                <Typography key="3" color="text.primary">
                    Breadcrumb
                </Typography>
            </Breadcrumbs>
            {progressAndData.progress === 0 && (<div>
                This is home
            </div>)}
            {progressAndData.progress === 1 && (<div>
                <FileUploadComponent />
            </div>)}
            {progressAndData.progress === 2 && (<div>
                <FileCropComponent />
            </div>)}
            Test
            Here
        </div>
    );
}

interface ProgressAndDataModel {
    progress: number;
    tempData: any;
    finalData: any;
}