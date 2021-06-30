import React, { useState } from 'react';
import _ from 'lodash';
import { Box, Container, Divider, Tab, Tabs, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import Card, { CardSkeleton, ICardComponentProps } from '../../components/CardList/Card';
import useStyles from './styles';

interface ICreditBodyComponentProps {
    cast: ICardComponentProps[];
    crew: {
        department: string;
        crew: ICardComponentProps[];
    }[];
    loading: boolean;
}

const TabPanel = ({ children, value, index, ...other }) => (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
    >
        {value === index && children}
    </div>
);

const CreditBody: React.FC<ICreditBodyComponentProps> = ({ cast, crew, loading }) => {
    const classes = useStyles();

    const [selectedTab, setSelectedTab] = useState(0);

    if (loading) return <CreditBodySkeleton />;

    return (
        <Box className={classes.mediaContainer}>
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(event, newValue) => setSelectedTab(newValue)}
            >
                <Tab label="Cast" disableRipple />
                <Tab label="Crew" disableRipple />
            </Tabs>
            <Divider />

            <Box className="media-items-container">
                <TabPanel className="tab-item overflow-overlay" value={selectedTab} index={0}>
                    {cast.map((props) => (
                        <Card variant="horizontal" {...props} />
                    ))}
                </TabPanel>
                <TabPanel className="crew-tab-item overflow-overlay" value={selectedTab} index={1}>
                    {crew.map(({ department, crew: departmentCrew }) => (
                        <>
                            <Typography variant="h6" gutterBottom className="semibold-text">
                                {department}
                            </Typography>
                            <Box className="card-items">
                                {departmentCrew.map((props) => (
                                    <Card variant="horizontal" {...props} />
                                ))}
                            </Box>
                        </>
                    ))}
                </TabPanel>
            </Box>
        </Box>
    );
};

export default CreditBody;

const CreditBodySkeleton: React.FC = () => {
    const classes = useStyles();

    return (
        <Box className={classes.mediaContainer}>
            <Typography variant="h4" gutterBottom>
                <Skeleton variant="text" width={260} />
            </Typography>
            <Divider />

            <Box className="media-items-container">
                <TabPanel className="tab-item overflow-overlay" value={0} index={0}>
                    {_.range(12).map(() => (
                        <CardSkeleton variant="horizontal" />
                    ))}
                </TabPanel>
            </Box>
        </Box>
    );
};
