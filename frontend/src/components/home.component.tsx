import React from 'react';

import './home.component.css';
import { useNavigate } from 'react-router-dom';

export const HomeComponent: React.FC = (): React.ReactElement => {

    const navigate = useNavigate();

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div className='home-link-box-round' onClick={() => navigate('/learning')}>
                Learning Home
            </div>
            <div className='home-link-box-round' onClick={() => navigate('/admin')}>
                Admin Home
            </div>

        </div>
    );
}