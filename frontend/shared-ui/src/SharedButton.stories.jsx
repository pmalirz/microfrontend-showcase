import SharedButton from './SharedButton';

export default {
    title: 'Example/SharedButton',
    component: SharedButton,
    parameters: {
        layout: 'centered',
    },
};

export const Primary = {
    args: {
        children: 'Button',
    },
};

export const Secondary = {
    args: {
        children: '😄',
    },
};
