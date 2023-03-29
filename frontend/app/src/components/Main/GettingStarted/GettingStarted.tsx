import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline } from '@material-ui/core';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import PathConstants from '../../../utils/pathConstants';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        height: '100vh'
    },
    textContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: '2rem',
        marginBottom: '2rem'
    },
    img: {
        width: '50%',
        height: 'auto',
        borderRadius: '0.5rem',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txt: {
        fontFamily: 'Nunito',
        marginBottom: '2rem'
    }
}));

export const GettingStarted: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.root} id={'GettingStarted'}>
            <CssBaseline />
            <div>
                <div className={classes.textContent}>
                    <Typography className={classes.txt} variant="h4">
                        Success in every step!
                    </Typography>
                    <Typography className={classes.txt} variant="body2">
                        Get help with exam preparation with community driven support, tailored to
                        your courses.
                    </Typography>
                    <div className={classes.buttonContainer}>
                        <Link to={PathConstants.courseSearch} style={{ textDecoration: 'none' }}>
                            <Button
                                sx={{
                                    margin: '0 1rem 0 0',
                                    borderRadius: '100px'
                                }}
                                variant="contained"
                            >
                                GET STARTED
                            </Button>
                        </Link>
                        <Link to={PathConstants.courseSearch} style={{ textDecoration: 'none' }}>
                            <Button
                                sx={{
                                    margin: '0 1rem 0 0',
                                    borderRadius: '100px'
                                }}
                                variant="outlined"
                            >
                                LEARN MORE
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
            <img
                className={classes.img}
                src={`${process.env.PUBLIC_URL + '/image3.jpg'}`}
                alt="Getting Started"
            />
        </div>
    );
};
