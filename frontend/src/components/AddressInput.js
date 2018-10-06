import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Mutation } from 'react-apollo'
import { gql } from 'apollo-boost'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const AddressInputStyle = {
<<<<<<< HEAD
    margin: "30px auto",
    width: "400px",
  }
=======
  margin: '30px auto',
}
>>>>>>> 873a7bc83f7282b0e9836326f63a88bbd58ed397

const CardStyle = {
  width: '800px',
  margin: '30px auto',
}

const ButtonStyle = {
  width: '800px',
  margin: '30px auto',
}

const RUN_TEST = gql`
  mutation Go($sol: String!, $nodeAddress: String!, $noOfUsers: Int!, $initialGasCost: Int, $contractAddress: String, $abi: String) {
    go(options: {sol: $sol, nodeAddress: $nodeAddress, noOfUsers: $noOfUsers, initialGasCost: $initialGasCost, contractAddress: $contractAddress, abi: $abi})
  }
`

class AddressInput extends Component {
  constructor() {
    super()
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <Card style={CardStyle}>
        <TextField
          id="standard-name"
          label="Contract Address"
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
          style={AddressInputStyle}
        />
        <Mutation mutation={RUN_TEST}>
          {(go, { error, loading }) => {
            if (loading) return <p>Loading...</p>
            if (error) console.dir(error)

            return <Button onClick={
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
            } style={ButtonStyle}>Submit</Button>
          }}
        </Mutation>
      </Card>
    )
  }
}

export default AddressInput
