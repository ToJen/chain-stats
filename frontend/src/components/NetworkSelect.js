import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
// import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
// import { getCiphers } from 'tls'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
})

class NetworkSelect extends React.Component {
  state = {
    network: 'Mainnet',
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
    this.props.onNetworkChange(event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      <form className={classes.root} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel>Network</InputLabel>
          <Select
            value={this.state.network}
            onChange={this.handleChange}
            inputProps={{
              name: 'network',
            }}
          >
            <MenuItem value={'https://mainnet.infura.io/'}>Mainnet</MenuItem>
            <MenuItem value={'https://ropsten.infura.io/'}>Ropsten</MenuItem>
            <MenuItem value={'https://rinkeby.infura.io/'}>Rinkeby</MenuItem>
            <MenuItem value={'https://kovan.infura.io/'}>Kovan</MenuItem>
            <MenuItem value={'http://127.0.0.1/'}>Localhost</MenuItem>
          </Select>
        </FormControl>
      </form>
    )
  }
}

NetworkSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(NetworkSelect)
