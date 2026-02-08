import React from 'react';

/**
 * A universal button that changes its background color to a random one when clicked.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Content to be displayed inside the button.
 */
const SharedButton = ({ children }) => {
    const [bgColor, setBgColor] = React.useState('blue');

    const changeColor = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setBgColor(randomColor);
    }

    return (
        <button
            onClick={changeColor}
            style={{
                background: bgColor,
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
            }}
        >
            {children}
        </button>
    );
}

export default SharedButton;