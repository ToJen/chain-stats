import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
})

class NodeDetails extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="standard-required"
          label="Web3 Provider URL"
          defaultValue="http://127.0.0.1:8545"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="standard-multiline-static"
          label="Contract Name"
          defaultValue="MyContract"
          className={classes.textField}
          margin="normal"
        />
      </form>
    )
  }
}

NodeDetails.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NodeDetails)
