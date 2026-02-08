import React from 'react';
// @ts-ignore
import SharedButton from 'sharedUI/SharedButton';

const Widget = () => {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: '#f8f9fa'
        }}>
            <h3>Remote 3 Widget (Rsbuild)</h3>
            <p>This component is built with Rsbuild and loaded via Module Federation.</p>
            <div style={{ marginTop: '10px' }}>
                <React.Suspense fallback="Loading Button...">
                    <SharedButton>Hello from Rsbuild!</SharedButton>
                </React.Suspense>
            </div>
        </div>
    );
};

export default Widget;
