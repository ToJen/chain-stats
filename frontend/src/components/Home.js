import React, { Component } from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
// import AddressInput from './AddressInput'
// import AddressArea from './AddresArea'
// import NodeDetails from './NodeDetails'
// import DeployedDetails from './DeployedDetails'
// import TestParameters from './TestParameters'
import withRoot from '../withRoot'
import { gql } from 'apollo-boost'
import { Mutation } from 'react-apollo'
import QuantForm from './QuantForm'
// import Lint from './Lint'

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
    marginTop: '250px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  bigTextField: {
    marginTop: '150px',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  button: {
    margin: theme.spacing.unit,
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
    sol: `pragma solidity ^0.4.24;


contract Stock {

    struct stock {
        uint256 cookies;
    }
    stock S;
    
    constructor(uint256 count) public{
         for (uint256 i = 0; i < count; i++) {
          S.cookies++;
        }
    }
    
     function transferCookies(uint256 count) public returns(uint256){
        uint256 cookies = S.cookies;
         S.cookies-= count;
         return cookies;
    }
}


contract Bakery {

    address public  baker;
    address[] public cookies;
    
    event Baked(address _theNewCookie);
   
     uint256 public cookieCount;
    
    constructor() public {
      baker = msg.sender;
    }
    
    function addCookie(address newCookie) public {
        cookies.push(newCookie);
        emit Baked(newCookie);
    }
    
    function stockUp(uint256 count) public{
        require(count<20);
        Stock stock = new Stock(count);
        bakeCookie(stock.transferCookies(count));
    }

    function bakeCookie(uint256 count) public returns(uint256){
        for (uint256 i = 0; i < count; i++) {
          cookieCount++;
        }
        return cookieCount;
    }
}`,
    nodeAddress: 'http://127.0.0.1:8545',
    contractName: 'Bakery',
    contractAddress: '',
    contractAbi: '',
    noOfUsers: '4',
    initialGasCost: 1000000,
    qspChecked: false,
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
    name === 'qspChecked'
      ? this.setState({ [name]: event.target.checked })
      : this.setState({
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
              rows="20"
              value={this.state.sol}
              className={classes.bigTextField}
              onChange={this.handleChange('sol')}
              margin="normal"
            />
            {/* <br /><br />
            <Lint contract={this.state.sol} /> */}
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
              className={classes.textField}
              control={
                <Checkbox
                  checked={this.state.qspChecked}
                  onChange={this.handleChange('qspChecked')}
                  margin="normal"
                />
              }
              label="Test with Quantstamp"
            />
            {this.state.qspChecked && <QuantForm />}
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
            <img src={require('./chainstats.png')} alt="logo" width="70px" />
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
                      {(go, { error }) => {
                        if (error) {
                          alert(error)
                        }

                        return (
                          <Button
                            className={classes.button}
                            variant="raised"
                            color="secondary"
                            onClick={async () => {
                              console.log(this.state)
                              go({
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
                            Go!
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
