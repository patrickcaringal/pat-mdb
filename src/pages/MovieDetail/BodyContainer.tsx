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
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4)
        },
        left: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'hidden',
            marginRight: theme.spacing(6)
        },
        right: {
            display: 'flex',
            flexDirection: 'column',
            width: 300,
            minWidth: 300,
            background: 'khaki'
        }
    };
});

interface BodyContainerProps {
    children?: ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <Box style={{ background: '#F3F8F3', height: 500 }}>
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
