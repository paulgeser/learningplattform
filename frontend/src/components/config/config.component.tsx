import React from 'react';

import { LinearProgress } from '@mui/material';

import NehemiaLogo from '../../assets/nehemia.webp';

export const ConfigLoadingComponent: React.FC = (): React.ReactElement => {

    return (
        <div className='mt-12'>
            <div className='flex flex-col justify-center items-center'>
                <img src={NehemiaLogo} alt='nehemia logo' />
                <p className='mb-2'>Loading application configuration</p>

                <LinearProgress className='w-60' />
            </div>
        </div>
    );
}