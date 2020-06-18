import React, { Component } from "react";
import packageJson from '../../package.json'
import '../App.css';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import Quicktron from "./img/JIB-Quicktron.png";
import AuthService from "./authlogin/AuthService";
class TopNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessapp: [],
      accessadmin: 0,
      collapse: false,
      isOpen: false,
      profile: {},
      packageJson: ''
    };
    this.Auth = new AuthService();
    this.handleLogout = this.handleLogout.bind(this);
    // this.getRoutetitle = this.getRoutetitle.bind(this);
  }
  handleLogout() {
    this.Auth.logout();
    window.location.reload();
  }
  
  componentDidMount() {

    let profile = this.Auth.getProfile();
    this.setState({ profile: profile, packageJson: packageJson.version });
    //let profile = this.Auth.getProfile();
    let Access = this.Auth.getAccess();
    let Accessadmin = this.Auth.getAccessadmin();

    //this.setState({ profile: profile });
    if (Access != 0) {
      let Accessapp = JSON.parse(Access);
      this.setState({ accessapp: Accessapp, accessadmin: Accessadmin }, () => {
        // console.log(this.state.accessapp);
      });
    } else {
      this.setState({ accessapp: [], accessadmin: [] }, () => {
        // console.log(this.state.accessapp);
      });
    }

  }
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  onClick = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  };

  render() {
    const stydp = { 'position': 'absolute', 'will-change': 'transform', 'top': '0px', 'left': '0px', 'transform': 'translate3d(220px, 40px, 0px)' }
    return (

      <div>
        {this.Auth.loggedIn() && (
          <MDBNavbar
            color="indigo darken-4"
            //style={{ background: "#2a2662" }}
            // className="flexible-navbar"
            dark
            expand="md"

          >
            <MDBNavbarBrand href="/" style={{ paddingTop: 0, paddingBottom: 0 }}>
              {/* <strong className="white-text">JIBQuicktron</strong> */}
              <img
                style={{ paddingLeft: 0, height: 35, marginLeft: 0 }}
                alt="MDB React Logo"
                className="img-fluid"
                src={Quicktron}
              />
            </MDBNavbarBrand>
            {/* <MDBNavbarBrand>
            <strong className="white-text">JIB Expenses</strong>
          </MDBNavbarBrand> */}
            <MDBNavbarToggler onClick={this.toggleCollapse} />

            <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
              <MDBNavbarNav left>
                {/* <MDBNavItem>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem> */}
                {this.state.accessadmin == 1 ?
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">เมนู</div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!"><a href='/AGV001'><MDBIcon icon="cart-plus" /> บันทึกสินค้าโอนเข้า AGV (AGV001)</a></MDBDropdownItem>
                        {/* <MDBDropdownItem href="#!"><a href='/AGV004'><MDBIcon icon="user-alt" /> นำสินค้าเข้า AGV Manual </a></MDBDropdownItem> */}
                        {/* <MDBDropdownItem href="#!"><a href='/AGV003'><MDBIcon icon="check-square" /> เบิกสินค้าจาก AGV</a></MDBDropdownItem> */}
                        <MDBDropdownItem href="#!"><a href='/AGV007'><MDBIcon icon="sync-alt" /> แสดงสถานะ Pending ของสินค้าโอนเข้า (AGV007)</a></MDBDropdownItem>
                        <MDBDropdownItem href="#!"><a href='/AGV008'><MDBIcon icon="list" /> Job Complete Inbound (AGV008)</a></MDBDropdownItem>
                        <MDBDropdownItem href="#!"><a href='/AGV010'><MDBIcon icon="clipboard" /> เอาสินค้าเข้า/ออก จากระบบ AGV (AGV010)</a></MDBDropdownItem>

                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                  : (

                    this.state.accessapp.length != 0 &&
                    this.state.accessapp[0].views == 1 && (
                      <MDBNavItem>
                        <MDBDropdown>
                          <MDBDropdownToggle nav caret>
                            <div className="d-none d-md-inline">เมนู</div>
                          </MDBDropdownToggle>
                          <MDBDropdownMenu className="dropdown-default">

                            {this.state.accessapp.length != 0 &&
                              this.state.accessapp[1].views == 1 && (
                                <MDBDropdownItem href="#!"><a href='/AGV001'><MDBIcon icon="cart-plus" /> บันทึกสินค้าโอนเข้า AGV (AGV001)</a></MDBDropdownItem>
                              )}
                               {this.state.accessapp.length != 0 &&
                              this.state.accessapp[1].views == 1 && (
                                <MDBDropdownItem href="#!"><a href='/AGV010'><MDBIcon icon="laptop" /> เอาสินค้าเข้า/ออก จากระบบ AGV (AGV010)</a></MDBDropdownItem>
                              )}




                            {/* <MDBDropdownItem href="#!"><a href='/AGV002'><MDBIcon icon="ban" /> ยกเลิก สินค้าเข้า AGV</a></MDBDropdownItem> */}
                            {/* {this.state.accessapp.length != 0 &&
                            this.state.accessapp[4].views == 1 && (
                              <MDBDropdownItem href="#!"><a href='/AGV004'><MDBIcon icon="user-alt" /> นำสินค้าเข้า AGV Manual </a></MDBDropdownItem>
                            )} */}
                            {/* {this.state.accessapp.length != 0 &&
                            this.state.accessapp[3].views == 1 && (
                              <MDBDropdownItem href="#!"><a href='/AGV003'><MDBIcon icon="check-square" /> เบิกสินค้าจาก AGV</a></MDBDropdownItem>
                            )} */}

                          </MDBDropdownMenu>
                        </MDBDropdown>
                      </MDBNavItem>
                    )
                  )
                }
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">Report</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem href="#!"><a href='/AGV005'><MDBIcon far icon="clipboard" /> แสดงสินค้าคงเหลือ (AGV005)</a></MDBDropdownItem>

                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>

                <MDBNavItem>

                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <div className="d-none d-md-inline">DashBoard</div>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">

                      <MDBDropdownItem href="#!"> <a href='/AGV006'><MDBIcon icon="tv" /> DashBoard (AGV006)</a></MDBDropdownItem>
                      <MDBDropdownItem href="#!"> <a href='/AGV012'><MDBIcon icon="tv" /> ออเดอร์ด่วน 3-2-1 ชั่วโมง (AGV012)</a></MDBDropdownItem>
                      {this.state.accessadmin == 1 ? <MDBDropdownItem href="#!"><a href='/AGV009'><MDBIcon icon="tv" /> Stock Alert (AGV009)</a></MDBDropdownItem> : ''}
                      {this.state.accessadmin == 1 ? <MDBDropdownItem href="#!"><a href='/AGV011'><MDBIcon icon="tv" /> AGV ORDER PROCESS (AGV011)</a></MDBDropdownItem> : ''}
                    </MDBDropdownMenu>
                  </MDBDropdown>

                </MDBNavItem>


              </MDBNavbarNav>

              <MDBNavbarNav right>
                {this.Auth.loggedIn() && (
                  <MDBNavItem >
                    <MDBDropdown >
                      <MDBDropdownToggle nav caret>
                        <div className="d-none d-md-inline">{this.state.accessadmin == 1 ? '🧛‍♂️MIS-ADMIN ' : '😀HI USER'}{this.state.profile.username}   <MDBIcon icon="user" /></div>
                        {/* {this.state.accessadmin==1?'🧛‍♂️MIS-ADMIN':'😀HI '} {this.state.profile.username},{this.state.profile.fullname}  <MDBIcon icon="user" /> */}
                      </MDBDropdownToggle>
                      <MDBDropdownMenu className="dropdown-default">
                        <MDBDropdownItem href="#!">{this.state.profile.username},{this.state.profile.fullname}</MDBDropdownItem>
                        <MDBDropdownItem onClick={this.handleLogout} ><MDBIcon icon="sign-out-alt" /> ออกจากระบบ</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                )}
                <MDBNavItem>
                  <MDBNavLink className="waves-effect waves-light" to="#!">
                    version {this.state.packageJson}
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>)}
      </div>
    );
  }
}

export default TopNavigation;
