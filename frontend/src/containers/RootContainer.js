import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import Home from '../components/Home'
import PageNotFound from '../components/PageNotFound'


class RootContainer extends Component {

  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route component={PageNotFound} />
          </Switch>
        </Fragment>
      </Router>
    )
  }
}


export default RootContainer
