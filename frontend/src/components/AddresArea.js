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

class AddressArea extends React.Component {
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
          id="standard-multiline-static"
          label="Contract Source Code"
          multiline
          rows="10"
          defaultValue=""
          className={classes.textField}
          margin="normal"
        />
      </form>
    )
  }
}

AddressArea.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddressArea)
