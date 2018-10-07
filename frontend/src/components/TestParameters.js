import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
})


class TestParameters extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        ifQuant: false,
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    };

    render() {
        const { classes } = this.props

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-number"
                    label="Number of Users"
                    value={this.state.age}
                    onChange={this.handleChange('age')}
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
                    value={this.state.age}
                    onChange={this.handleChange('age')}
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
          label="Secondary"
        />
            </form>
        )
    }
}

TestParameters.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(TestParameters)
