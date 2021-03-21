import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LeftContainer from './LeftContainer';
import RigthContainer from './RigthContainer';

// import { actions, interfaces } from '../../../ducks';

const useStyles = makeStyles({
    movieConent: {},
    leftSidebar: {
        width: 260,
        minWidth: 260
        // border: '1px solid red'
    },

    cardCont: {
        minWidth: 138,
        marginRight: 14
    },
    cardImg: {
        height: 175
    },
    cardContent: {
        '&.MuiCardContent-root:last-child': {
            paddingBottom: 16
        }
    },
    title: {
        fontWeight: 600
    },
    subtitle: {
        color: '#696969'
    },

    recommendationCard: {
        width: 120,
        marginBottom: 16
    },
    recommendationCardImg: {
        height: 195
    },
    recommendationCardContent: {
        '&.MuiCardContent-root': {
            padding: 10
        }
    },

    mediaTab: {
        '&.MuiTab-root': {
            textTransform: 'none'
        },
        '&.Mui-selected': {
            fontWeight: 600
        }
    },

    photoCard: {
        minWidth: 533,
        borderRadius: 0,
        marginRight: 14
    },
    photoCardImg: {
        height: 300
    },

    posterCard: {
        minWidth: 200,
        borderRadius: 0,
        marginRight: 14
    },
    posterCardImg: {
        height: 300
    }
});

interface BodyContainerProps {
    children?: ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Container disableGutters maxWidth="lg">
                <Box
                    display="flex"
                    flexDirection="row"
                    mt={4}
                    mx={4}
                    className={classes.movieConent}
                >
                    {/* Main */}
                    <Box display="flex" flexDirection="column" flex="1" overflow="hidden" mr={3}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === LeftContainer
                        )}
                    </Box>

                    {/* Left sidebar */}
                    <Box display="flex" className={classes.leftSidebar}>
                        <Box display="flex" flexDirection="column">
                            {React.Children.toArray(children).find(
                                (node: any) => node.type === RigthContainer
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default BodyContainer;
