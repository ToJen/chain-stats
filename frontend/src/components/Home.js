import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import FileDropper from './FileDropper'
// import AddressInput from './AddressInput'
// import AddressArea from './AddresArea'
// import NodeDetails from './NodeDetails'
// import DeployedDetails from './DeployedDetails'
// import TestParameters from './TestParameters'
import withRoot from '../withRoot'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import QuantFeedback from './QuantFeedback'
import QuantForm from './QuantForm'

const RUN_TEST = gql`
  mutation Go(
    $sol: String!
    $nodeAddress: String!
    $noOfUsers: Int!
    $initialGasCost: Int!
    $contractAddress: String
    $abi: String
    $contractName: String!
  ) {
    go(
      options: {
        sol: $sol
        nodeAddress: $nodeAddress
        noOfUsers: $noOfUsers
        initialGasCost: $initialGasCost
        contractAddress: $contractAddress
        abi: $abi
        contractName: $contractName
      }
    )
  }
`

const styles = theme => ({
  root: {
    textAlign: 'center',
    width: '100vw',
    height: '100vh',
    //paddingTop: theme.spacing.unit * 20,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  bigTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
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
    activeStep: 0,
    skipped: new Set(),
    sol:
      'pragma solidity ^0.4.24;contract Bakery { address public  baker; address[] public cookies; event Baked(address _theNewCookie); constructor() public { baker = msg.sender; } function addCookie(address newCookie) public { cookies.push(newCookie); emit Baked(newCookie);   } }',
    nodeAddress: 'http://127.0.0.1:8545',
    contractName: 'Bakery',
    contractAddress: '',
    contractAbi: '',
    noOfUsers: '4',
    initialGasCost: 1000000,
  }

  isStepOptional = step => {
    return step === 2
  }

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
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

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
  }

  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  updateSOL(event) {
    console.log(event)
    //this.setState({
    //  sol: event
    //})
  }

  getSteps = () => {
    return [
      'Paste contract source code',
      'Enter node details',
      'Deployed details',
      'Specify test parameters',
    ]
  }

  getStepContent = (step, classes) => {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              id="standard-multiline-static"
              label="Contract Source Code"
              multiline
              rows="10"
              value={this.state.sol}
              className={classes.bigTextField}
              onChange={this.handleChange('sol')}
              margin="normal"
            />
          </div>
        )
      case 1:
        return (
          <div>
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
        )
      case 2:
        return (
          <div>
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
        )
      case 3:
        return (
          <div>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.ifQuant}
                  onChange={this.handleChange('ifQuant')}
                  value="ifQuant"
                  margin="normal"
                />
              }
              label="Test with Quantstamp"
            />
            <QuantForm />
          </div>
        )
      default:
        return 'Whooops mate!'
    }
  }

  isStepSkipped(step) {
    return this.state.skipped.has(step)
  }

  render() {
    const { classes, history } = this.props
    const { activeStep } = this.state
    const steps = this.getSteps()

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar color="inherit">
            <Typography variant="title" color="inherit">
              <b>Chain</b>Stats
            </Typography>
          </Toolbar>
        </AppBar>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {}
            const labelProps = {}
            if (this.isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography>
              )
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
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          ) : (
            <div>
              {/* <Typography className={classes.instructions}> */}
              {this.getStepContent(activeStep, classes)}
              {/* </Typography> */}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>

                {this.isStepOptional(activeStep) && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSkip}
                    className={classes.button}
                  >
                    Skip
                  </Button>
                )}

                {activeStep === steps.length - 1 ? (
                  <Mutation mutation={RUN_TEST}>
                    {(go, { error, loading }) => {
                      if (loading) return <p>Loading...</p>
                      if (error) {
                        alert(error)
                      }

                      return (
                        <Button
                          className={classes.button}
                          onClick={async () => {
                            console.log(this.state)
                            await go({
                              variables: {
                                sol: this.state.sol,
                                nodeAddress: this.state.nodeAddress,
                                noOfUsers: this.state.noOfUsers,
                                initialGasCost: this.state.initialGasCost,
                                contractAddress: this.state.contractAddress,
                                abi: this.state.contractAbi,
                                contractName: this.state.contractName,
                              },
                            })
                            // console.log(this.state.noOfUsers)
                            localStorage.setItem(
                              'numUsers',
                              this.state.noOfUsers,
                            )
                            history.push('/results')
                          }}
                        >
                          Go
                        </Button>
                      )
                    }}
                  </Mutation>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleNext}
                    className={classes.button}
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withRoot(withStyles(styles)(Home))
