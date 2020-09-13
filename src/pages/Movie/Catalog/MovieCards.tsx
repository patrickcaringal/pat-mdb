import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    cardCont: {
        width: 'calc(((100vw - 80px - 260px - 128px) / 4))',
        maxWidth: '208px',
        marginLeft: 30,
        marginBottom: 30
    },
    cardImg: {
        height: 'calc((((100vw - 80px - 260px - 128px) / 4)) * 1.5)',
        maxHeight: 'calc(208px * 1.5)'
    }
});

interface MovieProps {}

const MovieCards: React.FC<MovieProps> = ({}) => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
            {[...new Array(6)].map(() => (
                <Card className={classes.cardCont} elevation={0} square style={{}}>
                    <CardMedia
                        className={classes.cardImg}
                        image="https://via.placeholder.com/150x225/767c77/fabea7"
                        title="Movie title"
                    />
                    <CardContent
                        style={{
                            padding: '8px 0 0',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        <Typography noWrap style={{ fontWeight: 600 }}>
                            Movie title
                        </Typography>
                        <Typography variant="body2" style={{ color: '#696969' }}>
                            Genre
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            {/* fillers */}
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
            <div className={classes.cardCont} />
        </Box>
    );
};

export default MovieCards;
