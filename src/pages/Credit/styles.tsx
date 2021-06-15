import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    bannerContainer: {
        color: '#fff',
        display: 'flex',
        flex: 1,
        background:
            'linear-gradient(to right, rgba(31, 36, 33, 1.00) 150px, rgba(38, 102, 69, 0.9) 100%)',
        '& .flex-row': {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        '& .flex-column': {
            display: 'flex',
            flexDirection: 'column',
            flex: 1
        },
        '& .poster-image': {
            // minWidth: 300,
            width: 94,
            height: 140,
            borderRadius: 8
        },
        '& .subtitle > span:not(:first-child)': {
            marginLeft: theme.spacing(1),
            '&::before': {
                content: '"\\2022"',
                marginRight: theme.spacing(1)
            }
        }
    },
    body: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(4)
        // flex: 1,
        // overflow: 'hidden',
        // marginRight: theme.spacing(8)
    },
    mediaContainer: {
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        '& .MuiTabs-flexContainer': {
            alignItems: 'center',
            '& .tab-title': {
                fontWeight: 600,
                marginRight: theme.spacing(4)
            },
            '& .MuiTab-root': {
                minWidth: 120
            },
            '& .Mui-selected': {
                fontWeight: 700
            }
        },

        '& .media-items-container': {
            '& .tab-item': {
                maxHeight: 500,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: theme.spacing(2),
                marginLeft: theme.spacing(-3)
            },
            '& .crew-tab-item': {
                maxHeight: 500,
                display: 'flex',
                flexDirection: 'column',
                '& .card-items': {
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: theme.spacing(2),
                    marginLeft: theme.spacing(-3),
                    marginBottom: theme.spacing(2)
                }
            },
            '& .MuiCard-root': {
                width: 340,
                marginLeft: theme.spacing(3),
                marginBottom: theme.spacing(3),
                '& .media': {
                    height: 100,
                    width: 100
                },
                '& .card-content': {
                    height: 100
                }
            }
        }
    }
}));
