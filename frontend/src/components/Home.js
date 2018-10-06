import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
// import FileDropper from './FileDropper'
// import AddressInput from './AddressInput'
import AddressArea from './AddresArea'
import NodeDetails from './NodeDetails'
import DeployedDetails from './DeployedDetails'
import TestParameters from './TestParameters'
import withRoot from '../withRoot'
import { Subscription } from 'react-apollo'

import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'

const USER_RESULTS_SUBSCRIPTION = gql`
  subscription userResult {
    userResult
  }
`

const RUN_TEST = gql`
  mutation Go($sol: String!, $nodeAddress: String!, $noOfUsers: Int!, $initialGasCost: Int, $contractAddress: String, $abi: String) {
    go(options: {sol: $sol, nodeAddress: $nodeAddress, noOfUsers: $noOfUsers, initialGasCost: $initialGasCost, contractAddress: $contractAddress, abi: $abi})
  }
`


const styles = theme => ({
  root: {
    textAlign: 'center',
    width: '100vw',
    height: '100vh',
    paddingTop: theme.spacing.unit * 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  // instructions: {
  //   marginTop: theme.spacing.unit,
  //   marginBottom: theme.spacing.unit,
  // },
})

function getSteps() {
  return ['Paste contract source code', 'Enter node details', 'Deployed details', 'Specify test parameters']
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressArea />
    case 1:
      return <NodeDetails />
    case 2:
      return <DeployedDetails />
    case 3:
      return <TestParameters />
    default:
      return 'Whooops mate!'
  }
}

class Home extends Component {
  state = {
    perFunction: [],
    perUser: {
      timeElapsed: [],
      failedFunctions: [],
      gasUsed: [],
    },
    activeStep: 0,
    skipped: new Set(),
  }

  isStepOptional = step => {
    return step === 2
  };

  handleNext = () => {
    const { activeStep } = this.state
    let { skipped } = this.state
    if (this.isStepSkipped(activeStep)) {
      skipped = new Set(skipped.values())
      skipped.delete(activeStep)
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped,
    })
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  };

  handleSkip = () => {
    const { activeStep } = this.state
    if (!this.isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error('You can\'t skip a step that isn\'t optional.')
    }

    this.setState(state => {
      const skipped = new Set(state.skipped.values())
      skipped.add(activeStep)
      return {
        activeStep: state.activeStep + 1,
        skipped,
      }
    })
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  };

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  render() {
    const { classes } = this.props
    const { perFunction, perUser, activeStep } = this.state
    const steps = getSteps()

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

        {/* <Typography variant="display1" gutterBottom>
          <font color="White">Chain</font>
          Stats
        </Typography>
        <Typography variant="subheading" gutterBottom>
          dApp Analytics Tool
        </Typography> */}

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {}
            const labelProps = {}
            if (this.isStepOptional(index)) {
              labelProps.optional = <Typography variant="caption">Optional</Typography>
            }
            if (this.isStepSkipped(index)) {
              props.completed = false
            }
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <Button onClick={this.handleReset} className={classes.button}>Reset</Button>
          ) : (
              <div>
                {/* <Typography className={classes.instructions}> */}
                {getStepContent(activeStep)}
                {/* </Typography> */}
                <div>
                  <Button disabled={activeStep === 0} onClick={this.handleBack} className={classes.button}>Back</Button>

                  {this.isStepOptional(activeStep) && (
                    <Button variant="contained" color="primary" onClick={this.handleSkip} className={classes.button}>Skip</Button>
                  )}

                  {
                    activeStep === steps.length - 1 ?
                      <Mutation mutation={RUN_TEST}>
                        {(go, { error, loading }) => {
                          if (loading) return <p>Loading...</p>
                          if (error) console.dir(error)

                          return <Button className={classes.button}
                            onClick={
                              () => go({
                                variables: {
                                  sol: '$sol',
                                  nodeAddress: '$nodeAddress',
                                  noOfUsers: 3,
                                  initialGasCost: 4,
                                  contractAddress: '$contractAddress',
                                  abi: '$abi'
                                }
                              })
                            }>Go</Button>
                        }}
                      </Mutation>
                      :
                      <Button variant="contained" color="primary" onClick={this.handleNext} className={classes.button}>Next</Button>
                  }
                </div>
              </div>
            )}
        </div>

        (perFunction:
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
        })})
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Home))
