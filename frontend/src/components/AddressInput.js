import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import withRoot from '../withRoot'
import NetworkSelect from './NetworkSelect'
const AddressInputStyle = {
    margin: "30px auto",
    width: "400px",
  }

const CardStyle = {
  width: '800px',
  margin: '30px auto',
}

const ButtonStyle = {
  width: '800px',
  margin: '30px auto',
  color: "#FFC107",
}

const RUN_TEST = gql`
  mutation Go($sol: String!, $nodeAddress: String!, $noOfUsers: Int!, $initialGasCost: Int, $contractAddress: String, $abi: String) {
    go(options: {sol: $sol, nodeAddress: $nodeAddress, noOfUsers: $noOfUsers, initialGasCost: $initialGasCost, contractAddress: $contractAddress, abi: $abi})
  }
`

class AddressInput extends Component {
  constructor() {
    super()
    this.state = {
         value: '',
         network: 'Mainnet',
         address: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ address: event.target.value })
    console.log(this.state);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  handleNetworkChange = (networkName) => {
    this.setState({network: networkName});
    console.log(networkName);
}

  render() {
    return (
      <Card style={CardStyle}>
        <TextField
          id="standard-name"
          label="Contract Address"
          value={this.state.address}
          onChange={this.handleChange}
          margin="normal"
          style={AddressInputStyle}
        />

        <NetworkSelect onNetworkChange={this.handleNetworkChange}/>

        <Mutation mutation={RUN_TEST}>
          {(go, { error, loading }) => {
            if (loading) return <p>Loading...</p>
            if (error) console.dir(error)

            return <Button onClick={
              () => go({
                variables: {
                  sol: '$sol',
                  nodeAddress: this.state.network,
                  noOfUsers: 3,
                  initialGasCost: 4,
                  contractAddress: this.state.address,
                  abi: '$abi'
                }
              })
            } style={ButtonStyle}>Submit</Button>
          }}
        </Mutation>

      </Card>
    )
  }
}

export default withRoot(AddressInput)
