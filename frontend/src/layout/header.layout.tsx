import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { BasicDataDialogComponent } from '../components/upload/basic-data-dialog.component';


export const HeaderLayout: React.FC = (): React.ReactElement => {

    const [uploadDialog, setUploadDialog] = useState<boolean>(false);

    const openDialog = () => {
        setUploadDialog(true);
    }

    const onCloseDialog = (value: any) => {
        if (value === null) {
            setUploadDialog(false);
        } else {
            console.log(value);
        }
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                Learning Plattform
                            </Link>
                        </Typography>
                        <Button color="inherit" onClick={openDialog}>
                            Upload
                        </Button>
                        <Button color="inherit">
                            <Link to="/learning">
                                Learning
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <BasicDataDialogComponent onClose={onCloseDialog} open={uploadDialog} />
        </div>
    );
}