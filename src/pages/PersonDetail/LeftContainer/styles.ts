import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    containers: {
        marginBottom: theme.spacing(4)
    },
    castList: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2)
    },
    collectionList: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(1)
    }
    // mediaTab: {
    //     '&.MuiTab-root': {
    //         textTransform: 'none'
    //     },
    //     '&.Mui-selected': {
    //         fontWeight: 600
    //     }
    // },
    // photoCard: {
    //     minWidth: 533,
    //     borderRadius: 0,
    //     marginRight: 14
    // },
    // photoCardImg: {
    //     height: 300
    // },
    // posterCard: {
    //     minWidth: 200,
    //     borderRadius: 0,
    //     marginRight: 14
    // },
    // posterCardImg: {
    //     height: 300
    // }
}));

export const cardStyle = {
    cardContainer: { minWidth: 138, width: 138, marginRight: 14 },
    cardImage: { height: 175 }
};

export const horizontalCardStyle = {
    cardContainer: { marginBottom: 18 },
    cardImage: { height: 141, width: 94 },
    cardContent: { paddingBottom: '10px !important', paddingTop: 10 }
};
