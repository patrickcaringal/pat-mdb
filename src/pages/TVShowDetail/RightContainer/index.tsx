import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Chip,
    Divider,
    Typography
} from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// import Chip from '@material-ui/core/Chip';

import { selectors } from '../../../store/tvShow.slice';

// import { useStyles, cardStyle } from './styles';
// import Skeleton from './Skeleton';
// import { Card, CardInterfaces } from '../../../../components/Card';
// import { CardList, CardHeader, CardItems } from '../../../../components/HorizontalCarList';

// import { actions, interfaces } from '../../../../ducks';
// import { formatNumWithComma } from '../../../../utils/helpers';

// interface IStateToProps {
//     data: interfaces.IMediaDetail;
//     recommendations: interfaces.IMedia[];
//     isLoading: boolean;
// }

// interface IDispatchToProps {}
const useStyles = makeStyles((theme) => ({
    title: {
        fontWeight: 600,
        marginBottom: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(2)
    },
    prodCompanyContainer: {
        // marginBottom: theme.spacing(3),
        paddingTop: theme.spacing(1),
        '& .bold-text': {
            fontWeight: 700
        },
        '& .prod-company-items': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: `${-theme.spacing(-1)} ${theme.spacing(1)}`,
            '& .prod-item': {
                padding: theme.spacing(1),
                margin: theme.spacing(1),
                display: 'flex',
                alignItems: 'center',
                width: 40,
                boxSizing: 'content-box',
                '& img': { width: 'inherit' }
            }
        },
        '& .keywords-container': {
            marginTop: theme.spacing(2),
            '& .MuiChip-sizeSmall': { margin: 4 }
        }
    },
    castContainer: {
        '& .cast-items-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3),

            '& .card-container': {
                width: 138,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3)
            },
            '& .media': {
                height: 175
            },
            '& .card-content': {
                padding: theme.spacing(1)
            }
        }
    }
}));

interface IOwnProps extends RouteComponentProps {}

const RightContainer: React.FC<IOwnProps> = ({ history }) => {
    const classes = useStyles();

    const {
        data: { keywords = [], production_companies = [], recommendations = [] },
        fetching: loading
    } = useSelector(selectors.tvShowDetailSelector);

    const handleRecommendationClick = (id: string, media: string) => {
        history.push(`/${media}/${id}`);
    };

    return (
        <>
            <Box className={classes.prodCompanyContainer}>
                <Typography className="bold-text" gutterBottom>
                    Production Companies
                </Typography>
                <Box className="prod-company-items">
                    {production_companies.map((company) => (
                        <Box className="prod-item" boxShadow={2}>
                            <img alt={company.name} src={company.logo} />
                        </Box>
                    ))}
                </Box>

                <Box className="keywords-container">
                    <Typography className="bold-text" gutterBottom>
                        Keywords
                    </Typography>
                    <Box display="flex" flexWrap="wrap" mt={1}>
                        {keywords.map((keyword) => (
                            <Chip label={keyword.name} onClick={() => {}} size="small" />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Divider className={classes.divider} />

            <Box className={classes.castContainer}>
                <Typography className={classes.title} variant="h5">
                    You may also like
                </Typography>
                <Box className="cast-items-container">
                    {recommendations.map((movie) => (
                        <Card className="card-container">
                            <CardActionArea
                                onClick={() =>
                                    handleRecommendationClick(movie.id, movie.media as string)
                                }
                            >
                                <CardMedia className="media" image={movie.poster} title="asd" />
                                <CardContent className="card-content">
                                    <Typography className="line-clamp-2" variant="body1">
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        className="line-clamp-2"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        {movie.genres.join(', ')}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>

            {/*
            <Divider />
            <Box mt={3} mb={2}>
                <Box display="flex" flexDirection="row">
                    <CardList<CardInterfaces.ICard> items={mappedRecommendationItems}>
                        <CardHeader title="You may also like" titleVariant="body1" />
                        <CardItems
                            itemRender={recommendationItemRender}
                            // Box props
                            display="flex"
                            py={2}
                            flexWrap="wrap"
                            justifyContent="space-between"
                        />
                    </CardList>
                </Box>
            </Box> */}
        </>
    );
};

export default withRouter(RightContainer);
