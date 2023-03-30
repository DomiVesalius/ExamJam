import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline } from '@material-ui/core';
import { Grid, Stack } from '@mui/material';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

export enum IconType {
    starIcon = 'star',
    flagIcon = 'flag'
}

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
        marginBottom: '2rem'
    },
    icon: {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.grey[800],
        borderRadius: 9
    }
}));

interface FeatureProps {
    description: string;
    image: string;
    icon: IconType;
}

export const Feature: React.FunctionComponent<FeatureProps> = (props: FeatureProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Grid container spacing={1}>
                <Grid item xs={12} marginLeft="46%">
                    {props.icon === IconType.flagIcon ? (
                        <EmojiFlagsIcon className={classes.icon} sx={{ fontSize: 37 }} />
                    ) : (
                        <div></div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <Typography className={classes.txt} variant="h4">
                            {props.description}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <img
                className={classes.img}
                src={`${process.env.PUBLIC_URL}${props.image}`}
                alt="Feature"
            />
        </div>
    );
};
