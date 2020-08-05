import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

function ElevationScroll({ children }: { children: React.ReactElement }) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0
    });
}

const Home: React.FC<{}> = (props) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6">PAT MDb</Typography>
                    </Toolbar>
                </AppBar>
            </ElevationScroll>
            <Toolbar />
            <Container>
                <Box my={2}>
                    {[...new Array(50)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
                            Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                            Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
                        )
                        .join('\n')}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default Home;
