import { ThemeProvider } from '@emotion/react';
import { Container, CssBaseline, Box, Avatar, Typography, TextField, FormControlLabel, Checkbox, Button, createTheme } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { StateContext } from '../../core/state';
import { Constants } from '../../core/constants';

const defaultTheme = createTheme();

export const LoginComponent: React.FC = (): React.ReactElement => {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [invalidLogin, setInvalidLogin] = useState<boolean>(false);

    const { authServiceInstance } = useContext(StateContext);

    const handleSubmit = () => {
        if (rememberMe) {
            localStorage.setItem(Constants.localStorageItemNames.username, username);
        } else {
            localStorage.removeItem(Constants.localStorageItemNames.username);
        }
        authServiceInstance.login(username, password).then((response) => {
            if (response) {
                setInvalidLogin(false);
            } else {
                setInvalidLogin(true);
            }
        });
    };

    useEffect(() => {
        const localStorageUsername = localStorage.getItem(Constants.localStorageItemNames.username);
        if (localStorageUsername) {
            setUsername(localStorageUsername);
        }
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete='off'
                            autoFocus
                            value={username} onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete='off'
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />}
                            label="Remember me"
                        />
                        {invalidLogin && (
                            <Typography component="h1" variant="h6" className='text-red-600'>
                                Invalid credentials!
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}