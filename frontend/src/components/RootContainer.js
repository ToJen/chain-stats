import React, { Component, Fragment } from 'react'
import {
  NavLink,
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import FeedPage from './FeedPage'
import DraftsPage from './DraftsPage'
import CreatePage from './CreatePage'
import DetailPage from './DetailPage'
import PageNotFound from './PageNotFound'
import FileDropper from './FileDropper'
import AddressInput from './AddressInput'
class RootContainer extends Component {



  render() {
    return (
      
      <Router>

        <Fragment>
          {this.renderNavBar()}
          {this.renderRoute()}
        </Fragment>
      </Router>
    )
  }

  renderNavBar() {
    return (
      <nav className="pa3 pa4-ns">
              <FileDropper/>
              <AddressInput/>
        <Link className="link dim black b f6 f5-ns dib mr3" to="/" title="Feed">
          Blog
        </Link>
        <NavLink
          className="link dim f6 f5-ns dib mr3 black"
          activeClassName="gray"
          exact={true}
          to="/"
          title="Feed"
        >
          Feed
        </NavLink>
        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <NavLink
              className="link dim f6 f5-ns dib mr3 black"
              activeClassName="gray"
              exact={true}
              to="/drafts"
              title="Drafts"
            >
              Drafts
            </NavLink>
          )}

        {this.props.data &&
          this.props.data.me &&
          this.props.data.me.email &&
          this.state.token && (
            <Link
              to="/create"
              className="f6 link dim br1 ba ph3 pv2 fr mb2 dib black"
            >
              + Create Draft
            </Link>
          )}
      </nav>
    )
  }

  renderRoute() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={FeedPage} />
          <Route
            path="/drafts"
            component={DraftsPage}
          />
          <Route
            path="/create"
            component={CreatePage}
          />
          <Route path="/post/:id" component={DetailPage} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    )
  }
}


export default RootContainer
