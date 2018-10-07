import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
const styles = theme => ({
  root: {
    maxWidth: 360,
    textAlign: 'center',
  },

  cardStyle: {
    textAlign: 'center',
    maxWidth: 600,
  },
})

class FunctionSelection extends React.Component {
  state = {
    checked: [0],
  }

  handleToggle = value => () => {
    const { checked } = this.state
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    this.setState({
      checked: newChecked,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Card>
          <Typography variant="display1" gutterBottom>
            Choose functions to test
          </Typography>
          <List>
            {[0, 1, 2, 3].map(value => (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value)}
                className={classes.listItem}
              >
                <Checkbox
                  checked={this.state.checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`Function ${value + 1}`} />
              </ListItem>
            ))}
          </List>
          <Button>Next</Button>
        </Card>
      </div>
    )
  }
}

FunctionSelection.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FunctionSelection)
