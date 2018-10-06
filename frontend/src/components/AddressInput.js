import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
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
      <Card>
        <TextField
          id="standard-name"
          label="Contract Address"
          value={this.state.value}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Card>
    )
  }
}

export default AddressInput
