import React from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import {
    Box,
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    Divider,
    Typography
} from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import { selectors } from '../../../store/person.slice';

const useStyles = makeStyles((theme) => ({
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    container: {
        '& .poster-image': {
            width: 200,
            height: 'auto',
            borderRadius: 8,
            marginBottom: theme.spacing(2)
        },
        '& .title': {
            fontWeight: 600,
            marginBottom: theme.spacing(2)
        },
        '& .bold-text': {
            fontWeight: 700
        },
        '& .semibold-text': {
            fontWeight: 600
        },
        '& .gutterTop': {
            marginTop: theme.spacing(2)
        },

        '& .popular-credit-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3),

            '& .card-container': {
                width: 138,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3),
                '& .media': {
                    height: 210
                },
                '& .card-content': {
                    padding: theme.spacing(1)
                }
            }
        },
        // Credits
        '& .MuiAccordion-root': {
            borderBottom: '1px solid #f3f8f3',
            '& .MuiAccordionSummary-root.Mui-expanded': {
                minHeight: 48
            }
        },
        '& .Mui-expanded': {
            margin: 0
        }
    }
}));

interface IOwnProps extends RouteComponentProps {}

const RightContainer: React.FC<IOwnProps> = ({ history }) => {
    const classes = useStyles();

    const {
        data: { name, biography, credits = [], department },
        fetching: loading
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

    return (
        <div className={classes.container}>
            <Typography className="title" variant="h3" gutterBottom>
                {name}
            </Typography>

            <Typography className="bold-text" gutterBottom>
                Biography
            </Typography>
            <Typography>{biography}</Typography>

            <Box className="gutterTop">
                <Typography className="title" variant="h5">
                    Known For
                </Typography>

                <Box className="popular-credit-container">
                    {popularCredits.map((credit) => (
                        <Card className="card-container">
                            <CardActionArea
                                onClick={() => {
                                    handleCreditClick(credit.id, credit.media as string);
                                }}
                            >
                                <CardMedia className="media" image={credit.poster} title="asd" />
                                <CardContent className="card-content">
                                    <Typography className="line-clamp-2" variant="body2">
                                        {credit.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Divider className={classes.divider} />

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
                                                new Date(cred.release_date).getFullYear() === year
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
        </div>
    );
};

export default withRouter(RightContainer);