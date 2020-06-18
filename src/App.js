import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
// import SideNavigation from './components/sideNavigation';
//import Footer from './components/Footer';
import { SnackbarProvider } from "notistack";
import AuthService from './components/authlogin/AuthService'

class App extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();
  }
  // componentDidMount(){
  //   console.log(this.Auth.loggedIn()) 
  // }
  render() {
    return (
      <div>
        <TopNavigation />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
        >
            <Routes />
        </SnackbarProvider>
      </div>
    );
  }
}

export default App;
