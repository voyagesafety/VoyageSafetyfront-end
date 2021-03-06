import React, { Component } from "react";
import "./App.css";
import { server, YES } from "./constants";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { setApp } from "./actions/app.action";
import { connect } from "react-redux";
import CombineComponents from "./components/index";
const {
  Header,
  Header2,
  Footer,
  Login,
  Register,
  Home,
  Detail,
  Addstore,
  Verify,
  Error,
  Establishdetail,
  Welcome,
  Dashboard,
  Profile,
  Vaccinationstatus,
  Forgetpassword,
  Resetpassword,
  Confirmbooking,
  Viewstaff,
  Thanksforbooking,
  Editestabilishment,
  Myestablishment,
} = CombineComponents;

const isLoggedIn = () => {
  return localStorage.getItem(server.LOGIN_PASSED) === YES;
  // return localStorage.getItem("Token") !== null;
};

// Protected Route
const SecuredRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

class App extends Component {
  componentDidMount() {
    this.props.setApp(this);
  }

  redirectToLogin = () => {
    return <Redirect to="/login" />;
  };

  render() {
    return (
      <Router>
        <div>
          {(isLoggedIn() && <Header />) || <Header2 />}
          <Switch>
            <Route exact path="/">
              <Redirect to="/index" />
            </Route>
            <Route path="/index" component={Welcome} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <SecuredRoute path="/home" component={Home} />
            <SecuredRoute path="/detail/:EstId/" component={Detail} />
            <SecuredRoute path="/establishdetail" component={Establishdetail} />
            <SecuredRoute path="/dashboard" component={Dashboard} />
            <SecuredRoute path="/profile" component={Profile} />
            <SecuredRoute path="/addstore" component={Addstore} />
            <Route path="/verify/:email/:key" component={Verify} />
            <SecuredRoute
              path="/vaccinationstatus"
              component={Vaccinationstatus}
            />
            <Route path="/forgetpassword" component={Forgetpassword} />
            <SecuredRoute
              path="/confirmbooking/:date/:EstId"
              component={Confirmbooking}
            />
            <SecuredRoute
              path="/thanksforbooking"
              component={Thanksforbooking}
            />
            <Route path="/resetpassword/:key" component={Resetpassword} />
            <SecuredRoute path="/viewstaff/:EstId" component={Viewstaff} />
            <SecuredRoute path="/myestablishment" component={Myestablishment} />
            <SecuredRoute
              path="/editestabilishment"
              component={Editestabilishment}
            />
            <Route path="*" component={Error} />
            <Route path="/error" component={Error} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setApp,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
