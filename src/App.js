import React, { Component } from 'react';
import NavBarComponent from "./component/NavBarComponent";
import {Link, Route, Switch} from 'react-router-dom'
import HomeComponent from "./component/HomeComponent";
import LoginComponent from "./component/LoginComponent";
import requireAuth from "./utils/requireAuth";
import LogoutComponent from "./component/LogoutComponent";
import notAuth from "./utils/notAuth";
import InstituteHeader from "./component/flash/InstituteHeader";
import ReduxToastr from 'react-redux-toastr'


class App extends Component {
  render() {
    return (
      <div className="App">
          <ReduxToastr
              timeOut={6000}
              newestOnTop={false}
              position="top-right"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              progressBar
              closeOnToastrClick
          />
          <div className="container">
              <NavBarComponent />
          </div>
          <div className="wrapper">
              <section className="main no-padding">
                  <InstituteHeader/>
                  <div className="container">
                      <Switch>
                          <Route path="/login" exact  component={notAuth(LoginComponent)} />
                          <Route path="/logout" exact component={LogoutComponent} />
                          <Route component={requireAuth(HomeComponent)} />
                      </Switch>
                  </div>
              </section>
              <div className="footer">
                  <div className="container">
                      <ul className="pull-left footer-menu">
                          <li>
                              <Link to="/" className="navbar-brand">Home</Link>
                          </li>
                      </ul>
                      <ul className="pull-right footer-menu">
                          <li> &copy; Shamim</li>
                      </ul>
                  </div>
              </div>
          </div>
      </div>
    );
  }
}

export default App;
