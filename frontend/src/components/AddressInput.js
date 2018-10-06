import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'

const AddressInputStyle = {
    margin: "30px auto",
    width: "400px",
  }

const CardStyle = {
    width: "800px",
    margin: "30px auto",
}

const ButtonStyle = {
    width: "800px",
    margin: "30px auto",
}

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
        <Button onClick={this.handleSubmit} style={ButtonStyle}>Submit</Button>
      </Card>
    )
  }
}

export default AddressInput
