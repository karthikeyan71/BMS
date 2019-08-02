import React, { Component } from 'react';
import Thumbnail from '../thumbnail/thumbnail';
import Number from '../number/number';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

class Wrapper extends Component {

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route path='/movie' component={Thumbnail} />
            <Route path='/number' component={Number} />
            <Route path='/' render={()=> (
                <div>
                  <br/>
                  <Link to='/movie'> <button> Movie Trailer </button> </Link>
                  <br/>
                  <br/>
                  <Link to='/number'> <button> Unique & Duplicates </button> </Link>
                </div>
              )}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withRouter(Wrapper);
