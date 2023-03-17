import React from 'react';
import Avatar from '@mui/material/Avatar';

/**
 * Taken from https://mui.com/material-ui/react-avatar
 */

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function nameAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name)
        },
        children: `${name[0]}`
    };
}

interface NameAvatarProps {
    name: string | undefined;
}

export default function NameAvatar(props: NameAvatarProps) {
    return <Avatar {...nameAvatar(props.name || 'A')} />;
}
