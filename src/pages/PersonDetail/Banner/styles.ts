import { makeStyles, Theme } from '@material-ui/core/styles';

export const bannerUseStyles = makeStyles<Theme, { bannerBg: string }>((theme) => ({
    backdrop: {
        background: (props) => `url(${props?.bannerBg}) no-repeat  right -200px top`,
        display: 'flex',
        color: '#fff',
        '& .backdrop-overlay': {
            display: 'flex',
            flex: 1,
            background:
                'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
        },
        '& .subtitle > span:not(:first-child)': {
            marginLeft: theme.spacing(1),
            '&::before': {
                content: '"\\2022"',
                marginRight: theme.spacing(1)
            }
        },
        '& .poster-image': {
            width: 300,
            height: 450,
            borderRadius: 8,
            border: '1px solid khaki'
        },
        // General
        '& .flex-row': {
            display: 'flex',
            flexDirection: 'row'
        },
        '& .flex-column': {
            display: 'flex',
            flexDirection: 'column'
        },
        '& .bold-text': {
            fontWeight: 700
        },
        '& .tagline-text': {
            fontStyle: 'italic',
            fontWeight: 600,
            marginBottom: 6
        }
    }
}));
