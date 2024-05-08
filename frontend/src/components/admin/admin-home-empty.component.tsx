import React from 'react';

export const AdminHomeEmptyComponent: React.FC = (): React.ReactElement => {

    return (
        <div style={{ marginTop: '65px' }}>
            <div className='flex flex-col items-center justify-center' style={{height: '60vh'}}>
                <p><strong>No admin area selected!</strong></p>
                <p>Please click on one of admin areas in the left handed drawer.</p>
            </div>
        </div>
    );
}