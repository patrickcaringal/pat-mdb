import { makeStyles, Theme } from '@material-ui/core/styles';

export const cardUseStyles = makeStyles<Theme, { [key: string]: any }>({
    cardCont: (props) => {
        if (props.variant === 'vertical') {
            return {
                ...props.cardContainer
            };
        }

        // horizontal
        return {
            ...props.cardContainer,
            display: 'flex',
            flexDirection: 'row'
        };
    },
    cardImg: (props) => ({
        height: 175,
        ...props.cardImage
    }),
    actionArea: {
        '&:hover $focusHighlight': {
            opacity: 0
        },
        width: 'inherit'
    },
    focusHighlight: {},
    cardContent: (props) => {
        if (props.variant === 'vertical') {
            return {
                '&.MuiCardContent-root:last-child': {
                    paddingBottom: 16
                },
                ...props.cardContent
            };
        }

        // horizontal
        return {
            ...props.cardContent,
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between'
        };
    },

    title: {
        fontWeight: 600
    }
});
