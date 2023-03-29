import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        height: '50vh'
    },
    textContent: {
        display: 'flex',
        flexDirection: 'row',
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
        marginBottom: '2rem'
    }
}));
interface FeatureProps {
    description: string;
    image: string;
}
export const FeatureOpposite: React.FunctionComponent<FeatureProps> = (props: FeatureProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <img
                className={classes.img}
                src={`${process.env.PUBLIC_URL}${props.image}`}
                alt="Feature"
            />
            <div className={classes.textContent}>
                <Typography className={classes.txt} variant="h4">
                    {props.description}
                </Typography>
            </div>
        </div>
    );
};
