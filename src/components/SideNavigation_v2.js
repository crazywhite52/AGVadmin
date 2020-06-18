import React, { Component } from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import { MDBNavLink } from "mdbreact";

// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

export default class TopAndSide extends Component {
  render() {
    return (
      <div>
        <SideNav
          onSelect={selected => {
            // Add your code here
          }}
          style={{ background: "#3e3e42" }}
        >
        <SideNav.Toggle />
          <div style={{ paddingTop: 110 }}>
            <SideNav.Nav defaultSelected="home">
              
                <NavItem eventKey="home">
                  <NavIcon>
                    <i
                      className="fa fa-fw fa-home"
                      style={{ fontSize: "1.75em" }}
                    />
                  </NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
              
              <NavItem eventKey="setting">
                <NavIcon>
                  <i
                    className="fa fa-fw fa-braille"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText>SETTING</NavText>
                <NavItem eventKey="charts/linechart">
                  <NavText>SPACE</NavText>
                </NavItem>
                <NavItem eventKey="charts/barchart">
                  <NavText>LOCATION</NavText>
                </NavItem>
              </NavItem>
              <NavItem eventKey="Out" style={{ paddingTop: 50 }}>
                <NavIcon>
                  <i
                    className="fa fa-fw fa-power-off"
                    style={{ fontSize: "1.75em" }}
                  />
                </NavIcon>
                <NavText>Sign Out</NavText>
              </NavItem>
            </SideNav.Nav>
          </div>
        </SideNav>
      </div>
    );
  }
}
