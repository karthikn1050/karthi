import React,{Component} from 'react'
import './App.css';
//import Vision from './components/vision';
import Image from './components/image';
import Report from './components/report'

import { BrowserRouter,Switch, Route, Link } from "react-router-dom";
//import Chart from './components/chart';
import AuthService from "./services/auth.service";
//import Sidebar from './components/sidebar/Sidebar'
import Login from "./components/login.component";
import Register from "./components/register.component";
//import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;
  return (
    <div>
       <BrowserRouter>
    <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Dashboard
          </Link>
          <div className="navbar-nav mr-auto">
            {/* <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li> */}

            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  User Management
                </Link>
              </li>
             
            </>
            )}

            {currentUser && (
              <>
              <li className="nav-item">
                <Link to={"/inspection"} className="nav-link">
                  Inspection
                </Link>
              </li>
              <li className="nav-item">
              <Link to={"/report"} className="nav-link">
                Report
              </Link>
            </li>
            </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              {/* <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li> */}
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  Logout
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Login
                </Link>
              </li>

             
            </div>
          )}
        </nav>
          
        <div className="container mt-3">
        
          <Switch>
            <Route exact path={["/", "/home"]} component={Login} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/inspection" component={Image} />
            <Route path="/report" component={Report} />
          </Switch>
        </div>
        </BrowserRouter>
        { /*<AuthVerify logOut={this.logOut}/> */ }
      </div>
  );
}
}

export default App;
