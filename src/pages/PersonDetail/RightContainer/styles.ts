import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    mediaTab: {
        '&.MuiTab-root': {
            textTransform: 'none'
        },
        '&.Mui-selected': {
            fontWeight: 600
        }
    },
    detailsCont: {
        '& .MuiTypography-body2:not(.MuiTypography-gutterBottom)': {
            fontWeight: 700
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: '0.75em'
        }
    }
});

export const cardStyle = {
    cardContainer: {
        minWidth: 140,
        width: 140,
        marginBottom: 16
    },
    cardImage: { height: 210 }
};
