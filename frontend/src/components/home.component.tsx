import React, { useContext, useEffect, useState } from 'react';

import './home.component.css';
import { useNavigate } from 'react-router-dom';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import { filter } from 'rxjs';
import { BasicUser } from '../core/model/basic-user.model';
import { StateContext } from '../core/state';

export const HomeComponent: React.FC = (): React.ReactElement => {

    const navigate = useNavigate();
    const { authServiceInstance } = useContext(StateContext);
    const [user, setUser] = useState<BasicUser | null>(null);

    useEffect(() => {
        authServiceInstance.user$.pipe(
            filter(user => !!user)
        ).subscribe(setUser);
    }, []);

    return (
        <div style={{ marginTop: '65px' }}>
            {user && (
                <>
                    <div className='text-5xl pt-10 pb-5'>
                        Welcome back {user.firstName}!
                    </div>
                    <div className='text-xl'>
                        It's great to have you back on the learning plattform! Please continue to your desired area by clicking on the area below or in the navigation bar.
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }} className='mt-10'>
                        <div className='home-link-box-round flex flex-col' onClick={() => navigate('/learning')}>
                            <div className='flex flex-row items-center'>
                                <LocalLibraryIcon style={{ fontSize: 50 }} />
                                <div className='ml-3 text-2xl home-link-box-text'>Learning Home</div>
                            </div>
                            <div className='mt-3 mb-3 ml-16 text-left'>
                                For students to master the malagasy language!
                            </div>
                        </div>
                        <div className='home-link-box-round flex flex-col justify-start' onClick={() => navigate('/admin')}>
                            <div className='flex flex-row items-center'>
                                <SettingsIcon style={{ fontSize: 50 }} />
                                <div className='ml-3 text-2xl home-link-box-text'>Admin Home</div>
                            </div>
                            <div className='mt-3 mb-3 ml-16 text-left'>
                                For teachers and administrators to create, modify and delete learnsets.
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}