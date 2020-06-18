import React, { Component } from "react";
import Input from "@material-ui/core/Input";
//import Button from "@material-ui/core/Button";
import AuthService from "./AuthService";
import { withSnackbar } from "notistack";
import { MDBBtn, MDBCard, MDBIcon, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import "./Login.css";
import logo from "./JIB-LOGO/jib-logo-white2.png";
import robot from "./../img/vector-robot.jpg"
class Login extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      open: false,
      username: null,
      password: null,
      profile: {},
      chkBg: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.chktime = this.chktime.bind(this);
    this.Auth = new AuthService();
  }
  componentWillMount() {
    window.removeEventListener("resize", this._handleWindowResize);
    if (this.Auth.loggedIn()) this.props.history.replace("/AGV006");

  }
  componentDidMount() {
    if (this.Auth.loggedIn()) {
      let profile = this.Auth.getProfile();
      this.setState({ profile: profile });
      this.props.enqueueSnackbar("ยินดีต้อนรับ เข้าสู่ระบบ.....", {
        variant: "success"
      });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
  };
  chktime() {

    let timeAfter30Mins = new Date(this.state.profile.exp * 1000);
    var limit = timeAfter30Mins.getDate() + '/' + (timeAfter30Mins.getMonth() + 1) + '/' + timeAfter30Mins.getFullYear() + ' เวลา ' + timeAfter30Mins.getHours() + ':' + timeAfter30Mins.getMinutes() + ':' + timeAfter30Mins.getSeconds() + ' น.';

    return (limit);
  }

  render() {
    const { vertical, horizontal, open } = this.state;

    return (

      <div className="BgLogin" style={{ 'padding-top': '80px', 'height': !this.Auth.loggedIn() ? '979px' : '915px' }} align="center">
        <MDBCol style={{ maxWidth: "30rem" }}>
          <MDBCard>
            <MDBCardImage style={{ 'background-color': 'rgb(5, 13, 90)', 'margin-top': '8px', 'padding-right': '40px', 'padding-left': '40px' }} className="img-fluid" src={logo} width="430" waves />
            <MDBCardBody>
              <MDBCardTitle><b style={{ 'color': '#000000' }}><k style={{'color':'#1e266b'}}>A</k><k style={{'color':'#fcb72f'}}>G</k><k style={{'color':'#1e266b'}}>V</k><k style={{'color':'#fcb72f'}}>a</k>dmin</b></MDBCardTitle>
              {!this.Auth.loggedIn() && (
                <form onSubmit={this.handleFormSubmit}>
                  <Input
                    autoFocus
                    autoComplete={"off"}
                    placeholder="รหัสพนักงาน"
                    type="text"
                    name="username"
                    onChange={this.handleChange}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                  />
                  <br />
                  <br />
                  <Input
                    autoComplete={"off"}
                    placeholder="password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                    inputProps={{
                      "aria-label": "Description"
                    }}
                  />
                  <br /> <br />
                  <MDBBtn gradient="peach" type="supmit">
                    <MDBIcon icon="sign-in-alt" /> เข้าสู่ระบบ
              </MDBBtn>
                  {/* <Button variant="contained" type="supmit">
                {" "}
                เข้าระบบ
              </Button> */}
                </form>

              )}
              {this.Auth.loggedIn() && (
                <div style={{ color: "green" }}>
                  <br />

                  <h5 style={{ textAlign: "left" }}>
                    <k style={{ color: "black", margin: 20, marginLeft: 30 }}>
                      <MDBIcon
                        icon="check-circle"
                        size="2x"
                        className="green-text pr-3"
                      />{" "}
                  คุณกำลังใช้งานระบบอยู่{" "}
                    </k>
                  </h5>
                  <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                    <k style={{ color: "black" }}>รหัสผู้ใช้งาน :</k>{" "}
                    {this.state.profile.username}
                  </h6>
                  <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                    <k style={{ color: "black" }}>ชื่อผู้ใช้ : </k>
                    {this.state.profile.fullname}
                  </h6>
                  <h6 style={{ textAlign: "left", margin: 20, marginLeft: 30 }}>
                    <k style={{ color: "black" }}>หมดเวลา :</k> {this.chktime()}
                  </h6>
                  <br />
                  <MDBBtn
                    gradient="peach"
                    type="button"
                    style={{ color: "white" }}
                    onClick={this.handleLogout}
                  >
                    <MDBIcon icon="sign-out-alt" /> ออกจากระบบ
              </MDBBtn>

                </div>
              )}
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

      </div>



    );
  }
  handleFormSubmit(e) {
    e.preventDefault();
    if (
      this.state.username === null ||
      this.state.username === "" ||
      this.state.password === "" ||
      this.state.password === null
    ) {
      this.props.enqueueSnackbar(
        "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
        {
          variant: "error"
        }
      );
    } else {
      this.Auth.login(this.state.username, this.state.password)
        .then(res => {
          if (res.accessapp === false) {
            this.props.enqueueSnackbar(
              "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
              {
                variant: "error"
              }
            );
          } else {
            //  console.log(res)
            window.location.reload();
            this.setState({ chkBg: true }, () => {
              console.group('Value login');
              console.log(this.state.chkBg);
              console.groupEnd();
            })

          }
        })
        .catch(err => {
          this.props.enqueueSnackbar(
            "รหัสผู้ใช้หรือ พาสเวิร์ดไม่ถูกต้อง ลองใหม่อีกครั้ง..",
            {
              variant: "error"
            }
          );
        });
    }
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleLogout() {
    this.Auth.logout();
    window.location.reload();
  }
}
export default withSnackbar(Login);
