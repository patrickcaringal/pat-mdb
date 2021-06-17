import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    List,
    ListItem,
    Box,
    Divider,
    Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { selectors } from '../../store/person.slice';
import Card, { CardSkeleton } from '../../components/CardList/Card';
import useStyles from './styles';

interface IOwnProps extends RouteComponentProps {}

const RightContainer: React.FC<IOwnProps> = ({ history }) => {
    const {
        data: { name, biography, credits = [], department },
        fetching: personDetailLoading
    } = useSelector(selectors.personDetailSelector);

    const isActor = department?.toLocaleLowerCase() === 'acting';

    const popularCredits = credits
        .slice()
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, 6);

    const uniqueCreditYear = new Set(credits.map((i) => new Date(i.release_date).getFullYear())); // [ 'A', 'B']
    const creditYears = Array.from(uniqueCreditYear.values());

    const handleCreditClick = (id: string, media: string) => {
        history.push(`/${media}/${id}`);
    };

    if (personDetailLoading) return <RightContainerSkeleton />;

    return (
        <>
            <Typography className="title" variant="h3" gutterBottom>
                {name}
            </Typography>

            {biography && (
                <>
                    <Typography className="bold-text" gutterBottom>
                        Biography
                    </Typography>
                    <Typography>{biography}</Typography>
                </>
            )}

            {popularCredits.length > 0 && (
                <Box className="gutterTop">
                    <Typography className="title" variant="h5">
                        Known For
                    </Typography>

                    <Box className="popular-credit-container">
                        {popularCredits.map((credit) => (
                            <Card
                                onClick={() => {
                                    handleCreditClick(credit.id, credit.media as string);
                                }}
                                poster={credit.poster}
                                title={credit.title}
                            />
                        ))}
                    </Box>
                </Box>
            )}

            <Divider className="divider" />

            {creditYears.length > 0 && (
                <Box>
                    <Typography className="title" variant="h5">
                        Credits
                    </Typography>

                    <Box>
                        {creditYears.map((year) => (
                            <Accordion expanded>
                                <AccordionSummary>
                                    <Typography className="bold-text" variant="h6">
                                        {year}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <List dense>
                                        {credits
                                            .filter(
                                                (cred) =>
                                                    new Date(cred.release_date).getFullYear() ===
                                                    year
                                            )
                                            .map((cred) => (
                                                <ListItem>
                                                    <Typography className="semibold-text">
                                                        {cred.title}
                                                    </Typography>
                                                    <Typography style={{ whiteSpace: 'pre' }}>
                                                        {cred.character
                                                            ? ` ${isActor ? 'as' : '...'} ${
                                                                  cred.character
                                                              }`
                                                            : ''}
                                                    </Typography>
                                                </ListItem>
                                            ))}
                                    </List>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Box>
            )}
        </>
    );
};

export default withRouter(RightContainer);

const RightContainerSkeleton: React.FC = () => (
    <>
        <Typography className="title" variant="h3" gutterBottom>
            <Skeleton variant="text" width={400} />
        </Typography>

        <Typography className="bold-text" gutterBottom>
            <Skeleton variant="text" width={160} />
        </Typography>
        <Typography>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
        </Typography>

        <Box className="gutterTop">
            <Typography className="title" variant="h5">
                <Skeleton variant="text" width={160} />
            </Typography>

            <Box className="popular-credit-container">
                {_.range(6).map(() => (
                    <CardSkeleton />
                ))}
            </Box>
        </Box>

        <Divider className="divider" />

        <Box>
            <Typography className="title" variant="h5">
                <Skeleton variant="text" width={160} />
            </Typography>

            <Box>
                {_.range(3).map(() => (
                    <Accordion expanded>
                        <AccordionSummary>
                            <Typography className="bold-text" variant="h6">
                                <Skeleton variant="text" width={100} />
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                {_.range(2).map(() => (
                                    <ListItem>
                                        <Typography className="semibold-text">
                                            <Skeleton variant="text" width={300} />
                                        </Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    </>
);
