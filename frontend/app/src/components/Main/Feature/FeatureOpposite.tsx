import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CssBaseline } from '@material-ui/core';
import { Grid, Stack } from '@mui/material';
import { IconType } from './Feature';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '2rem',
        paddingTop: 0,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column'
        },
        height: '50%'
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
        marginBottom: '2rem',
        paddingRight: '6vw'
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
            <Grid container spacing={2}>
                <Grid item xs={12} marginLeft="46%">
                    {props.icon === IconType.starIcon ? (
                        <StarBorderIcon className={classes.icon} sx={{ fontSize: 37 }} />
                    ) : (
                        <div></div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <Typography variant="h4">{props.description}</Typography>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};
