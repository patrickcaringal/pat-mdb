import { makeStyles, Theme } from '@material-ui/core/styles';

export const cardUseStyles = makeStyles<Theme, { [key: string]: any }>({
    cardCont: {
        minWidth: (props) => props?.width || 138,
        marginRight: (props) => props?.marginRight || 0
    },
    cardImg: {
        height: (props) => props?.imgHeight || 175
    },
    actionArea: {
        '&:hover $focusHighlight': {
            opacity: 0
        }
    },
    focusHighlight: {},
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    }
});
