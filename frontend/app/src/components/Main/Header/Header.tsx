import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, IconButton, Grow } from '@material-ui/core';
import { shadows } from '@mui/system';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme: any) => ({
    root: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    colorText: {
        color: '#07b0ff'
    },
    title: {
        fontWeight: 'bold'
    }
}));
export const Header: React.FunctionComponent = () => {
    const classes = useStyles();
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        setChecked(true);
    }, []);
    return (
        <div>
            <Grow
                in={checked}
                style={{ transformOrigin: '0 100 0' }}
                {...(checked ? { timeout: 3000 } : {})}
            >
                <div className={classes.root}>
                    <Typography variant="h1" className={classes.title} gutterBottom>
                        Welcome to
                        <br />
                        <span className={classes.colorText}>ExamJam</span>
                    </Typography>
                    <Scroll to="GettingStarted" smooth={true}>
                        <IconButton>
                            <KeyboardDoubleArrowDownIcon style={{ color: '#07b0ff' }} />
                        </IconButton>
                    </Scroll>
                </div>
            </Grow>
        </div>
    );
};
