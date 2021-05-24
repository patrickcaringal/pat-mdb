import React, { ReactNode } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';

const useStyles = makeStyles((theme) => {
    return {
        content: {
            display: 'flex',
            flexDirection: 'row',
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            paddingLeft: 24,
            paddingRight: 24
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            width: 200,
            minWidth: 200,
            marginRight: theme.spacing(5)
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1
        }
    };
});

interface BodyContainerProps {
    children?: ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <Box style={{ background: '#F3F8F3' }}>
            <Container className={classes.content} disableGutters maxWidth="lg">
                {/* left */}
                <Box className={classes.left}>
                    {React.Children.toArray(children).find(
                        (node: any) => node.type === LeftContainer
                    )}
                </Box>

                {/* right */}
                <Box className={classes.right}>
                    {React.Children.toArray(children).find(
                        (node: any) => node.type === RightContainer
                    )}
                </Box>
            </Container>
        </Box>
    );
};

export default BodyContainer;
