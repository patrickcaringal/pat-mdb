import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Typography } from '@material-ui/core';
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

// import Chip from '@material-ui/core/Chip';

import { selectors } from '../../../store/movie.slice';

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
    prodCompanyContainer: {
        marginBottom: theme.spacing(3),
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
    }
}));

interface IOwnProps {}

const RightContainer: React.FC<IOwnProps> = () => {
    const classes = useStyles();

    const {
        data: { keywords = [], production_companies = [], recommendations = [] },
        fetching: loading
    } = useSelector(selectors.movieDetailSelector);

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

export default RightContainer;
