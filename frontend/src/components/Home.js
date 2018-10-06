import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
// import { graphql } from 'react-apollo'
// import { gql } from 'apollo-boost'
import FileDropper from './FileDropper'
import AddressInput from './AddressInput'
import withRoot from '../withRoot'
import FunctionSelection from './FunctionSelection'
import LoadSelection from './LoadSelection'
import Dashboard from './Dashboard'
import TopStepper from './TopStepper'
import { Subscription } from 'react-apollo'

import { gql } from 'apollo-boost'

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: '#3F51B5',
    width: '100vw',
    height: '100vh',
    paddingTop: theme.spacing.unit * 20,
  },
})
const USER_RESULTS_SUBSCRIPTION = gql`
  subscription userResult {
    userResult
  }
`

class Home extends Component {
  state = {
    perFunction: [],
    perUser: {
      timeElapsed: [],
      failedFunctions: [],
      gasUsed: [],
    },
  }
  render() {
    const { classes } = this.props
    const { perFunction, perUser } = this.state
    return (
      <div className={classes.root}>
        <Subscription
          subscription={USER_RESULTS_SUBSCRIPTION}
          onSubscriptionData={({
            subscriptionData: { data: { userResult } },
          }) => {
            const { perFunction, perUser } = JSON.parse(userResult)
            console.dir(JSON.parse(userResult))
            this.setState(state => {
              return {
                perFunction: [...state.perFunction, ...perFunction],
                perUser: {
                  timeElapsed: [
                    ...state.perUser.timeElapsed,
                    ...perUser.timeElapsed,
                  ],
                  failedFunctions: [
                    ...state.perUser.failedFunctions,
                    ...perUser.failedFunctions,
                  ],
                  gasUsed: [...state.perUser.gasUsed, ...perUser.gasUsed],
                },
              }
            })
          }}
        />
        <Typography variant="display1" gutterBottom>
          <font color="White">Chain</font>
          Stats
        </Typography>
        <Typography variant="subheading" gutterBottom>
          dApp Analytics Tool
        </Typography>
        <AddressInput />
        <FileDropper />
        perFunction:
        {perFunction.map((item, index) => {
          return <h4 key={index}>User Result: {JSON.stringify(item)}</h4>
        })}
        PerUser:
        {Object.keys(perUser).map((item, index) => {
          return (
            <h4 key={index}>
              {item}:{JSON.stringify(perUser[item])}
            </h4>
          )
        })}
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Home))
