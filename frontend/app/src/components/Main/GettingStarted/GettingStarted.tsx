import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { CssBaseline, Typography, Button } from '@material-ui/core';
import { Feature } from '../Feature/Feature';

const useStyles = makeStyles((theme: any) => ({
    root: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        height: '100vh'
    },
    colorText: {
        color: '#07b0ff'
    },
    title: {
        fontFamily: 'Nunito'
    },
    butt: {
        borderRadius: '20px',
        width: '150px'
    },
    textContent: {
        textAlign: 'left'
    },
    img: {
        width: '10vw'
    }
}));

export const GettingStarted: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} id={'GettingStarted'}>
            <CssBaseline />
            <div>
                <div className={classes.textContent}>
                    <Typography variant="h4">Success in every step</Typography>
                    <Typography variant="body2">Success in every step</Typography>
                </div>
                <div>
                    <Button className={classes.butt} variant="contained">
                        Contained
                    </Button>
                    <Button className={classes.butt} variant="outlined">
                        Outlined
                    </Button>
                </div>
            </div>
            <img className={classes.img} src={`${process.env.PUBLIC_URL + '/image3.jpg'}`} />
        </div>
    );
};
