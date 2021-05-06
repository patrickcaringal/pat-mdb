import { makeStyles, Theme } from '@material-ui/core/styles';

export const bannerUseStyles = makeStyles<Theme, { bannerBg: string }>({
    backdrop: {
        background: (props) => `url(${props?.bannerBg}) no-repeat  right -200px top`,
        color: '#fff'
    },
    backdropOverlay: {
        background:
            'linear-gradient(to right, rgba(14.12%, 14.51%, 16.86%, 1.00) 150px, rgba(22.35%, 22.35%, 22.35%, 0.84) 100%)'
    },
    poster: {
        width: 300,
        height: 450,
        borderRadius: 8
    },
    boldText: { fontWeight: 700 },
    tagline: {
        fontStyle: 'italic',
        fontWeight: 600,
        marginBottom: 6
    }
});
