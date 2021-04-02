import { makeStyles, Theme } from '@material-ui/core/styles';

export const cardUseStyles = makeStyles<Theme, { [key: string]: any }>({
    cardCont: (props) => ({
        minWidth: 138,
        width: 138,
        ...props.cardContainer
    }),
    cardImg: (props) => ({
        height: 175,
        ...props.cardImage
    }),

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
