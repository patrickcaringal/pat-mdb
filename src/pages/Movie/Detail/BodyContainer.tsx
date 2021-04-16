import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';

const useStyles = makeStyles((theme) => {
    return {
        content: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: theme.spacing(4),
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4)
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
            minWidth: 300
        }
    };
});

interface BodyContainerProps {
    children?: ReactNode;
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
    const classes = useStyles();

    return (
        <>
            <Container disableGutters maxWidth="lg">
                <Box className={classes.content}>
                    {/* right panel */}
                    <Box className={classes.left}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === LeftContainer
                        )}
                    </Box>

                    {/* left panel */}
                    <Box className={classes.right}>
                        {React.Children.toArray(children).find(
                            (node: any) => node.type === RightContainer
                        )}
                    </Box>
                </Box>
            </Container>
        </>
    );
};

export default BodyContainer;
