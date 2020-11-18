import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
    cardCont: {
        minWidth: '150px',
        background: 'transparent',
        marginRight: '30px'
    },
    cardImg: {
        height: '225px',
        borderRadius: '8px'
    }
});

interface MovieCardProps extends RouteComponentProps {}

const MovieCard: React.FC<MovieCardProps> = () => {
    const classes = useStyles();

    return (
        <Card className={classes.cardCont} elevation={0} square>
            <CardActionArea disableRipple disableTouchRipple>
                <Skeleton
                    variant="rect"
                    animation="pulse"
                    height={225}
                    style={{ borderRadius: '8px' }}
                />

                <CardContent
                    style={{
                        padding: '8px 0 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {/* <Typography noWrap style={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" style={{ color: '#696969' }}>
                        {subtitle}
                    </Typography> */}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withRouter(MovieCard);
