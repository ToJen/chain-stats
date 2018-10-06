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
import TopStepper from './TopStepper'

const styles = theme => ({
  root: {
    textAlign: 'center',
    backgroundColor: "#3F51B5",
    width: "100vw",
    height: "100vh",
    paddingTop: theme.spacing.unit * 20,
  },
})


class Home extends Component {

  render() {
    
    const { classes } = this.props

    return (

      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
        <font color="White">
          Chain
          </font>
          Stats
        </Typography>
        <Typography variant="subheading" gutterBottom>
          dApp Analytics Tool
        </Typography>
        <AddressInput />
        <FileDropper />
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