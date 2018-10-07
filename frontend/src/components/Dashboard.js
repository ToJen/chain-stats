import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import MenuIcon from '@material-ui/icons/Menu'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SimpleLineChart from './SimpleLineChart'
import SuccessFailPieChart from './SuccessFailPieChart'
import TimeTakenChart from './TimeTakenChart'
import RadialChart from './RadialChart'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Subscription } from 'react-apollo'
import { gql } from 'apollo-boost'
import withRoot from '../withRoot'
import QuantFeedback from './QuantFeedback'

import { parseData, getErrorRate, getTransactionStat } from '../utils'

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
        flexGrow: 1,
        marginBottom: "10px"
    },
    number: {
        flexGrow: 1,
        fontSize: '50px',
        margin: '10px',
    },
    subTitle: {
        flexGrow: 1,
        fontSize: '20px',
        margin: '10px',
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
        padding: '30px',
        textAlign: 'center',
        color: theme.palette.text.primary,
        height: '400px',

    },
    halfPaper: {
        backgroundColor: '#27293B',
        padding: '30px',
        textAlign: 'center',
        color: theme.palette.text.primary,
        height: '200px',

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
            'stockUp': {
                'gasSpent': 0,
                'timeTaken': 0,
                'errorCount': 0
            },
            'bakeCookie': {
                'gasSpent': 0,
                'timeTaken': 0,
                'errorCount': 0
            }
        },
        open: true,
        failRate: 0,
        timeTakenData: [
            // {
            //     ms: 5
            // }, {
            //     ms: 12
            // }, {
            //     ms: 25
            // }, {
            //     ms: 57
            // }, {
            //     ms: 44
            // }, {
            //     ms: 98
            // }, {
            //     ms: 68
            // }, {
            //     ms: 71
            // }, {
            //     ms: 83
            // }, {
            //     ms: 90
            // }
            {
                ms: 120,
                name: 'addCookie'
            }, {
                ms: 40,
                name: 'stockUp'
            }, {
                ms: 70,
                name: 'bakeCookie'
            },
        ],
        gasCostData: [
            {
                gas: 5,
                name: 'addCookie'
            }, {
                gas: 42,
                name: 'stockUp'
            }, {
                gas: 25,
                name: 'bakeCookie'
            },
        ],
        minTime: '',
        minTimeName: '',
        maxTime: '',
        maxTimeName: '',
        minGas: '',
        minGasName: '',
        maxGas: '',
        maxGasName: '',
        mergedData: [
            { name: 'addChoice', gas: 4000, ms: 240 },
            { name: 'stockUp', gas: 3000, ms: 139 },
            { name: 'bakeCookie', gas: 2000, ms: 980 }
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

                            // debugger
                            console.log(res)

                            const _gasPerFunction = Object.keys(res).map(i => { return { gas: res[i].gasSpent, name: i } })
                            const _timePerFunction = Object.keys(res).map(i => { return { ms: res[i].timeTaken, name: i } })
                            const _mergedData = Object.keys(res).map(i => { return { name: i, gas: res[i].gasSpent, ms: res[i].timeTaken } })

                            this.setState({ parsedData: res, gasCostData: _gasPerFunction, timeTakenData: _timePerFunction, mergedData: _mergedData })
                            const errorRate = getErrorRate(localStorage.getItem('numUsers'), 3, res)
                            // console.log({ errorRate })
                            this.setState({ failRate: errorRate })


                            const _timeStat = getTransactionStat(res, 'timeTaken')
                            const _gasStat = getTransactionStat(res, 'gasSpent')

                            // debugger
                            const maxTime = _timeStat.map(i => Object.values(i)[0])[0]
                            const maxTimeName = _timeStat.map(i => Object.keys(i)[0])[0]

                            const minTime = _timeStat.map(i => Object.values(i)[0])[1]
                            const minTimeName = _timeStat.map(i => Object.keys(i)[0])[1]

                            const maxGas = _gasStat.map(i => Object.values(i)[0])[0]
                            const maxGasName = _gasStat.map(i => Object.keys(i)[0])[0]

                            const minGas = _gasStat.map(i => Object.values(i)[0])[1]
                            const minGasName = _gasStat.map(i => Object.keys(i)[0])[1]

                            this.setState({
                                minTime,
                                minTimeName,
                                maxTime,
                                maxTimeName,
                                minGas,
                                minGasName,
                                maxGas,
                                maxGasName
                            })
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
                            <Grid item xs={3}>
                                <Paper className={classes.halfPaper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Fastest Function (ms)</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.number}>{this.state.minTime}</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.subTitle}>{this.state.minTimeName}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={classes.halfPaper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Slowest Function (ms)</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.number}>{this.state.maxTime}</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.subTitle}>{this.state.maxTimeName}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={classes.halfPaper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Most Expensive Function (Gas)</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.number}>{this.state.maxGas}</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.subTitle}>{this.state.maxGasName}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper className={classes.halfPaper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Cheapest Function (Gas)</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.number}>{this.state.minGas}</Typography>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.subTitle}>{this.state.minGasName}</Typography>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Gas Cost by Contract Function</Typography>
                                    <SimpleLineChart data={this.state.gasCostData} dataKey="gas" />
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Time vs. Contract Functions</Typography>
                                    <TimeTakenChart data={this.state.timeTakenData} />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
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
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Benchmark Score</Typography>
                                    {/* <SimpleLineChart data={this.state.mergedData} dataKey="ms" isMulti />
                                 */}
                                    <RadialChart />
                                </Paper>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.paper}>
                                    <Typography
                                        component="h1"
                                        variant="title"
                                        color="inherit"
                                        noWrap
                                        className={classes.title}>Vulnerabilities by Quantstamp</Typography>
                                    <QuantFeedback />
                                </Paper>
                            </Grid>
                        </Grid>

                        {/* perFunction: <h4>User Result: {JSON.stringify(parsedData)}</h4> */}

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