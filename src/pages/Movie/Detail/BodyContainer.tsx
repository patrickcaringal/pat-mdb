import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';

const useStyles = makeStyles({
    movieConent: {},
    leftSidebar: {
        width: 300,
        minWidth: 300
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
                    <Box display="flex" flexDirection="column" flex="1" overflow="hidden" mr={6}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === LeftContainer
                        )}
                    </Box>

                    {/* <Box style={{ background: '#ccc', width: 1.5 }} mx={4} /> */}
                    {/* Left sidebar */}
                    <Box display="flex" className={classes.leftSidebar}>
                        <Box display="flex" flexDirection="column">
                            {React.Children.toArray(children).find(
                                (node: any) => node.type === RightContainer
                            )}
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default BodyContainer;
