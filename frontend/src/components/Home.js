import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
// import FileDropper from './FileDropper'
// import AddressInput from './AddressInput'
// import AddressArea from './AddresArea'
// import NodeDetails from './NodeDetails'
// import DeployedDetails from './DeployedDetails'
// import TestParameters from './TestParameters'
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
  mutation Go($sol: String!, $nodeAddress: String!, $noOfUsers: Int!, $initialGasCost: Int!, $contractAddress: String, $abi: String, $contractName: String!) {
    go(options: {sol: $sol, nodeAddress: $nodeAddress, noOfUsers: $noOfUsers, initialGasCost: $initialGasCost, contractAddress: $contractAddress, abi: $abi, contractName: $contractName})
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
    sol: '',
    nodeAddress: '',
    contractName: '',
    contractAddress: '',
    contractAbi: '',
    noOfUsers: '',
    initialGasCost: ''
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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  getSteps = () => {
    return ['Paste contract source code', 'Enter node details', 'Deployed details', 'Specify test parameters']
  }

  getStepContent = (step, classes) => {
    switch (step) {
      case 0:
        return <TextField
          id="standard-multiline-static"
          label="Contract Source Code"
          multiline
          rows="10"
          value={this.state.sol}
          className={classes.textField}
          onChange={this.handleChange('sol')}
          margin="normal"
        />
      case 1:
        return <div>
          <TextField
            required
            id="standard-required"
            label="Web3 Provider URL"
            // defaultValue="http://127.0.0.1:8545"
            value={this.state.nodeAddress}
            className={classes.textField}
            margin="normal"
            onChange={this.handleChange('nodeAddress')}
          />
          <TextField
            id="standard-multiline-static"
            label="Contract Name"
            // defaultValue=""
            className={classes.textField}
            value={this.state.contractName}
            margin="normal"
            onChange={this.handleChange('contractName')}
          />
        </div>
      case 2:
        return <div>
          <TextField
            id="standard-required"
            label="Deployed Contract Address"
            // defaultValue="0x"
            value={this.state.contractAddress}
            className={classes.textField}
            onChange={this.handleChange('contractAddress')}
            margin="normal"
          />
          <TextField
            id="standard-multiline-static"
            label="Contract ABI"
            value={this.state.contractAbi}
            className={classes.textField}
            onChange={this.handleChange('contractAbi')}
            margin="normal"
          />
        </div>
      case 3:
        return <div>
          <TextField
            id="standard-number"
            label="Number of Users"
            value={this.state.noOfUsers}
            onChange={this.handleChange('noOfUsers')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            id="standard-number"
            label="Initial Gas"
            value={this.state.initialGasCost}
            onChange={this.handleChange('initialGasCost')}
            type="number"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>
      default:
        return 'Whooops mate!'
    }
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  render() {
    const { classes } = this.props
    const { perFunction, perUser, activeStep } = this.state
    const steps = this.getSteps()

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
                {this.getStepContent(activeStep, classes)}
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
                              () => {
                                console.log(this.state)
                                go({
                                  variables: {
                                    sol: this.state.sol,
                                    nodeAddress: this.state.nodeAddress,
                                    noOfUsers: this.state.noOfUsers,
                                    initialGasCost: this.state.initialGasCost,
                                    contractAddress: this.state.contractAddress,
                                    abi: this.state.contractAbi,
                                    contractName: this.state.contractName
                                  }
                                })
                              }
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
