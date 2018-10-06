import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = {
  root: {
    width: 300,
  },
};

const ranges = [
    {
      value: '20',
      label: '20',
    },
    {
      value: '40',
      label: '40',
    },
    {
      value: '60',
      label: '60',
    },
  ];

class LoadSelection extends React.Component {
  state = {
    value: 50,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <Typography id="label">Slider label</Typography>
        <Slider value={value} aria-labelledby="label" />
        <TextField
          select
          label="With Select"
          className={classNames(classes.margin, classes.textField)}
          value={this.state.weightRange}
          onChange={this.handleChange('weightRange')}
          InputProps={{
            startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
          }}
        >
          {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
}

LoadSelection.propTypes = {
  LoadSelection: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadSelection);