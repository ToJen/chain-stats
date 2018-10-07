import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import { mainListItems, secondaryListItems } from './listItems'
import SimpleLineChart from './SimpleLineChart'
import SimpleTable from './SimpleTable'
import SuccessFailPieChart from './SuccessFailPieChart'
import TimeTakenChart from './TimeTakenChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Subscription } from 'react-apollo'
import { gql } from 'apollo-boost'
import withRoot from '../withRoot'
<<<<<<< HEAD
import QuantFeedBack from './QuantFeedback'
import QuantFeedback from './QuantFeedback';
=======

import { parseData, getErrorRate } from '../utils'

>>>>>>> ca56cc1fa0c8c1dcf4cdf81778c6d2f55038bca6
const drawerWidth = 240

const USER_RESULTS_SUBSCRIPTION = gql`
  subscription userResult {
    userResult
  }
`

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    },
    appBar: {
        color: theme.palette.text.primary,
        zIndex: theme.zIndex.drawer + 1,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme
            .transitions
            .create([
                'width', 'margin'
            ], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36
    },
    menuButtonHidden: {
        display: 'none'
    },
    title: {
        flexGrow: 1
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme
            .transitions
            .create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
        width: theme.spacing.unit * 7,
        [
            theme
                .breakpoints
                .up('sm')
        ]: {
            width: theme.spacing.unit * 9
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto'
    },
    chartContainer: {
        marginLeft: -22
    },
    tableContainer: {
        height: 320
    },
    paper: {
        backgroundColor: '#27293B',
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        height: '400px'
    }
})

class Dashboard extends React.Component {
    state = {
        parsedData: {
            'addCookie': {
                'gasSpent': 0,
                'timeTaken': 0,
                'errorCount': 0
            },
            'FuncTwo': {
                'gasSpent': 0,
                'timeTaken': 0,
                'errorCount': 0
            },
            'FuncThree': {
                'gasSpent': 0,
                'timeTaken': 0,
                'errorCount': 0
            }
        },
        open: true,
        failRate: 0,
        timeTakenData: [
            {
                ms: 5
            }, {
                ms: 12
            }, {
                ms: 25
            }, {
                ms: 57
            }, {
                ms: 44
            }, {
                ms: 98
            }, {
                ms: 68
            }, {
                ms: 71
            }, {
                ms: 83
            }, {
                ms: 90
            }
        ]
    };

    componentDidMount() {
        this.setState({ failRate: 50 })
    }

    handleDrawerOpen = () => {
        this.setState({ open: true })
    };

    handleDrawerClose = () => {
        this.setState({ open: false })
    };

    render() {
        const { classes } = this.props
        const { parsedData, failRate } = this.state

        return (
            <React.Fragment>
                <div className={classes.root}>
                    <Subscription
                        subscription={USER_RESULTS_SUBSCRIPTION}
                        onSubscriptionData={({
                            subscriptionData: {
                                data: {
                                    userResult
                                }
                            }
                        }) => {
                            const { perFunction, perUser } = JSON.parse(userResult)
                            console.dir(JSON.parse(userResult))
                            const res = parseData({ ...parsedData }, perFunction)
                            console.log(res)
                            this.setState({ parsedData: res })
                            const errorRate = getErrorRate(localStorage.getItem('numUsers'), 3, res)
                            console.log({ errorRate })
                            this.setState({ failRate: errorRate })
                            // this.setState(state => {
                            //     return {
                            //         perFunction: [
                            //             ...state.perFunction,
                            //             ...perFunction
                            //         ],
                            //         perUser: {
                            //             timeElapsed: [
                            //                 ...state.perUser.timeElapsed,
                            //                 ...perUser.timeElapsed
                            //             ],
                            //             failedFunctions: [
                            //                 ...state.perUser.failedFunctions,
                            //                 ...perUser.failedFunctions
                            //             ],
                            //             gasUsed: [
                            //                 ...state.perUser.gasUsed,
                            //                 ...perUser.gasUsed
                            //             ]
                            //         }
                            //     }
                            // })
                        }} />
                    <AppBar position="absolute" color="primary">
                        <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                className={classNames(classes.menuButton, this.state.open && classes.menuButtonHidden)}>
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="title"
                                color="inherit"
                                noWrap
                                className={classes.title}>
                                Results
                            </Typography>
                            <IconButton color="inherit">
                                <Badge badgeContent={4} color="secondary">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>

                    <main className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Gas Cost vs Time</Typography>
                                    <SimpleLineChart data={this.state.timeTakenData} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Time vs. Functions</Typography>
                                    <TimeTakenChart data={this.state.timeTakenData} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Success vs. Fail Rate</Typography>
                                    <SuccessFailPieChart failRate={failRate} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <SimpleLineChart data={this.state.timeTakenData} />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                <Typography
                                    component="h1"
                                    variant="title"
                                    color="inherit"
                                    noWrap
                                    className={classes.title}>Vulnerabilities by Quantstamp</Typography>
                                    <QuantFeedback/>
                                </Paper>
                            </Grid>
                        </Grid>

                        perFunction: <h4>User Result: {JSON.stringify(parsedData)}</h4>

                        {/* PerUser: {Object
                            .keys(perUser)
                            .map((item, index) => {
                                return (
                                    <h4 key={index}>
                                        {item}:{JSON.stringify(perUser[item])}
                                    </h4>
                                )
                            })} */}
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Dashboard))