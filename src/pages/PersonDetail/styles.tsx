import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    content: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        paddingLeft: 24,
        paddingRight: 24
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        minWidth: 200,
        marginRight: theme.spacing(5),

        '& .poster-image': {
            width: 200,
            height: 300,
            borderRadius: 8,
            marginBottom: theme.spacing(2),
            backgroundColor: '#dbdbdb'
        },
        '& .MuiTypography-gutterBottom': {
            marginBottom: theme.spacing(2)
        }
    },
    rightContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        '& .title': {
            fontWeight: 600,
            marginBottom: theme.spacing(2)
        },
        '& .gutterTop': {
            marginTop: theme.spacing(2)
        },
        '& .divider': {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        },
        '& .popular-credit-container': {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginLeft: theme.spacing(-3),
            marginBottom: theme.spacing(-3),

            '& .MuiCard-root': {
                width: 138,
                '& .media': {
                    height: 210
                }
            }
        }, // Credits Accordion
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
