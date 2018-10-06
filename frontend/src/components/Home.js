import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
// import { graphql } from 'react-apollo'
// import { gql } from 'apollo-boost'
import FileDropper from './FileDropper'
import AddressInput from './AddressInput'
import withRoot from '../withRoot'
import FunctionSelection from './FunctionSelection'
import LoadSelection from './LoadSelection'
import Dashboard from './Dashboard'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})


class Home extends Component {

  state = {
    open: false,
  }

  handleClose = () => {
    this.setState({
      open: false,
    })
  }

  handleClick = () => {
    this.setState({
      open: true,
    })
  }

  render() {
    const { classes } = this.props
    const { open } = this.state

    return (
      <div className={classes.root}>
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Super Secret Password</DialogTitle>
          <DialogContent>
            <DialogContentText>1-2-3-4-5</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.handleClose}>
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Typography variant="display1" gutterBottom>
          Chain Stats
        </Typography>
        <Typography variant="subheading" gutterBottom>
          dApp Analytics Tool
        </Typography>
        <Button variant="contained" color="secondary" onClick={this.handleClick}>
          Super Secret Password
        </Button>

        <FileDropper />
        <AddressInput />
        <FunctionSelection />
        <LoadSelection />
        <Dashboard />
      </div>
    )
  }

}

// const FEED_QUERY = gql`
//   query FeedQuery {
//     feed {
//       id
//       text
//       title
//       isPublished
//       author {
//         name
//       }
//     }
//   }
// `
// const FEED_SUBSCRIPTION = gql`
//   subscription FeedSubscription {
//     feedSubscription {
//       node {
//         id
//         text
//         title
//         isPublished
//         author {
//           name
//         }
//       }
//     }
//   }
//`

// export default graphql(FEED_QUERY, {
//   name: 'feedQuery', // name of the injected prop: this.props.feedQuery...
//   options: {
//     fetchPolicy: 'network-only',
//   },
//   props: props =>
//     Object.assign({}, props, {
//       subscribeToNewFeed: params => {
//         return props.feedQuery.subscribeToMore({
//           document: FEED_SUBSCRIPTION,
//           updateQuery: (prev, { subscriptionData }) => {
//             if (!subscriptionData.data) {
//               return prev
//             }
//             const newPost = subscriptionData.data.feedSubscription.node
//             if (prev.feed.find(post => post.id === newPost.id)) {
//               return prev
//             }
//             return Object.assign({}, prev, {
//               feed: [...prev.feed, newPost],
//             })
//           },
//         })
//       },
//     }),
// })(Home)


export default withRoot(withStyles(styles)(Home))