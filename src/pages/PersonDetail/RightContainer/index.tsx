import React, { useCallback, useMemo } from 'react';
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
    Chip,
    Divider,
    Typography
} from '@material-ui/core';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import { selectors } from '../../../store/tvShow.slice';

const useStyles = makeStyles((theme) => ({
    // title: {
    //     fontWeight: 600,
    //     marginBottom: theme.spacing(2)
    // },
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
                    height: 175
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

        // borderBottom: '1px solid #f3f8f3'

        // '& .MuiTypography-gutterBottom': {
        //     marginBottom: theme.spacing(2)
        // }
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
        <div className={classes.container}>
            <Typography className="title" variant="h3" gutterBottom>
                Robert Downey Jr.
            </Typography>

            <Typography className="bold-text" gutterBottom>
                Biography
            </Typography>
            <Typography>
                Robert John Downey Jr. (born April 4, 1965) is an American actor and producer.
                Downey made his screen debut in 1970, at the age of five, when he appeared in his
                father's film Pound, and has worked consistently in film and television ever since.
                He received two Academy Award nominations for his roles in films Chaplin (1992) and
                Tropic Thunder (2008). Downey Jr. is most known for his role in the Marvel Cinematic
                Universe as Tony Stark/Iron Man. He has appeared as the character in Iron Man
                (2008), The Incredible Hulk (2008), Iron Man 2 (2010), The Avengers (2012), Iron Man
                3 (2013), Avengers: Age of Ultron (2015), Captain America: Civil War (2016),
                Spider-Man: Homecoming (2017), Avengers: Infinity War (2018), and Avengers: Endgame
                (2019).
            </Typography>

            <Box className="gutterTop">
                <Typography className="title" variant="h5">
                    Known For
                </Typography>

                <Box className="popular-credit-container">
                    {_.range(6).map((i) => (
                        <Card className="card-container">
                            <CardActionArea onClick={() => {}}>
                                <CardMedia
                                    className="media"
                                    image="https://via.placeholder.com/138x210"
                                    title="asd"
                                />
                                <CardContent className="card-content">
                                    <Typography className="line-clamp-2" variant="body2">
                                        Lorem, ipsum dolor.
                                    </Typography>
                                    <Typography
                                        className="line-clamp-2"
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        lorem2
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
                    <Accordion expanded>
                        <AccordionSummary>
                            <Typography className="bold-text" variant="h6">
                                2021
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded>
                        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
                            <Typography className="bold-text" variant="h6">
                                2020
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded>
                        <AccordionSummary aria-controls="panel2a-content" id="panel2a-header">
                            <Typography className="bold-text" variant="h6">
                                2019
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List dense>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        Avengers: Endgame as Tony Stark / Iron Man
                                    </Typography>
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            </Box>
        </div>
    );
};

export default withRouter(RightContainer);
