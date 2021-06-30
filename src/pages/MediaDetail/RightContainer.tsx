import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Chip, Divider, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import * as i from '../../store/interfaces';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';

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
    recommendationsContainer: {
        '& .items-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3),
            '& .card-container': {
                width: 138
            },
            '& .media': {
                height: 210
            }
        }
    }
}));

interface IOwnProps extends RouteComponentProps {
    productionCompanies: i.ICompany[];
    keywords: i.IKeyword[];
    recommendations: ICardComponentProps[];
    loading: boolean;
}

const RightContainer: React.FC<IOwnProps> = ({
    keywords,
    productionCompanies,
    recommendations,
    loading
}) => {
    const classes = useStyles();

    if (loading) return <RightSectionSkeleton />;

    return (
        <>
            <Box className={classes.prodCompanyContainer}>
                <Typography className="bold-text" gutterBottom>
                    Production Companies
                </Typography>
                <Box className="prod-company-items">
                    {productionCompanies.map((company) => (
                        <Box className="prod-item" boxShadow={2}>
                            <img alt={company.name} src={company.logo} title={company.name} />
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

            {recommendations.length !== 0 && (
                <>
                    <Divider className={classes.divider} />
                    <Box className={classes.recommendationsContainer}>
                        <Typography className={classes.title} variant="h5">
                            You may also like
                        </Typography>
                        <Box className="items-container">
                            {recommendations.map((props) => (
                                <Card {...props} />
                            ))}
                        </Box>
                    </Box>
                </>
            )}
        </>
    );
};

export default withRouter(RightContainer);

const RightSectionSkeleton: React.FC = () => {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.prodCompanyContainer}>
                <Typography className="bold-text" gutterBottom>
                    <Skeleton variant="text" width={140} />
                </Typography>
                <Box className="prod-company-items">
                    {_.range(3).map(() => (
                        <Skeleton className="prod-item" variant="rect" width={40} height={40} />
                    ))}
                </Box>

                <Box className="keywords-container">
                    <Typography className="bold-text" gutterBottom>
                        <Skeleton variant="text" width={140} />
                    </Typography>
                    <Box display="flex" flexWrap="wrap" mt={1}>
                        {_.range(8).map(() => (
                            <Skeleton
                                className="MuiChip-sizeSmall"
                                style={{ borderRadius: 50 }}
                                variant="rect"
                                width={60}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>

            <Divider className={classes.divider} />

            <Box className={classes.recommendationsContainer}>
                <Typography className={classes.title} variant="h5">
                    <Skeleton variant="text" width={140} />
                </Typography>
                <Box className="items-container">
                    {_.range(10).map(() => (
                        <CardSkeleton />
                    ))}
                </Box>
            </Box>
        </>
    );
};
