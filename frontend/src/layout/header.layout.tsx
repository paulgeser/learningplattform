import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


export const HeaderLayout: React.FC = (): React.ReactElement => {

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit">
                            <Link to="/learning">
                                Learning
                            </Link>
                        </Button>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/">
                                Learning Plattform
                            </Link>
                        </Typography>
                        <Button color="inherit">
                            <Link to="/admin">
                                Admin
                            </Link>
                        </Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}