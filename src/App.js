import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import fetchInitialMap from './actions/fetchInitialMap'
import getCurrentUser from './actions/getCurrentUser'

import MapContainer from './containers/MapContainer'
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import Profile from './components/Profile'
import MarkerCard from './components/MarkerCard'

class App extends Component {   
  
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchInitialMap();
  }

  handleErrorClick = () => {
    this.setState({error: false})
  }
  
  render() {
    return (
      <div className="App">
        {this.props.error ? 
        <div className="warning-message">
          <i className="close icon" onClick={this.handleErrorClick}></i>
          <div className="header">
            Error
          </div>
            <p>{this.props.messages}</p>
            <p>Please log in or sign up</p>
          </div> 
          : 
          null}

      <NavBar />
        <Switch>
          <Route exact path="/" component={MapContainer} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route path="/markers/:id" component={MarkerCard} />
          <Route path="/profile" render={(props) => <Profile {...props}/>}/>
        </Switch>
      </div>
    );
  }
  
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCurrentUser: () => { dispatch(getCurrentUser()) },
    fetchInitialMap: () => { dispatch(fetchInitialMap()) }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))