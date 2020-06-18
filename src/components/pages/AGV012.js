import React, { PureComponent } from 'react'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon
} from 'mdbreact'
import TbAGV from './panel/TbAgv12'
import AuthService from '../authlogin/AuthService'
class AGV012 extends PureComponent {
  constructor (props) {
    super(props)
    this.Auth = new AuthService()
    this.state = {}
  }
  componentWillMount () {
    if (!this.Auth.loggedIn()) {
      this.props.history.replace('/login')
    } else {
      try {
        const profile = this.Auth.getProfile()
        this.setState({
          user: profile
        })
      } catch (err) {
        this.Auth.logout()
        this.props.history.replace('/login')
      }
    }
  }

  render () {
    return (
      <>
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol style={{ marginTop: "1rem" }}>
              <h3 style={{ color: '#27293d' }} className='font-weight-bold'>
              ออเดอร์ด่วน 3-2-1 ชั่วโมง (AGV012)
              </h3>
            </MDBCol>
          </MDBRow>
          <TbAGV></TbAGV>
        </MDBContainer>
      </>
    )
  }
}

export default AGV012
