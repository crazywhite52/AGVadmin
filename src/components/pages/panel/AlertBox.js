import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBAlert,MDBCard,MDBBadge } from "mdbreact";
import './../css/agv009.css';
import Tlogo from '../../../assets/Timeicon.png';



class AlertBox extends PureComponent {
    constructor(props) {
        super(props)

    }





    render() {

        return (
          <MDBCard sm="6" className={'mt-n1',this.props.boxcolor} style={{marginTop: '5px' , color:'black'}}>

            <MDBRow  style={{marginTop: '8px', marginLeft: '10px'}}>
              <MDBCol sm='12' md='2'>
                <k style={{color: '#262262'}}>รหัสสินค้า</k>
                <MDBTypography style={{marginTop: '1em'}}>
                
                  <k style={{fontSize:"18px",}}>{this.props.sku_number}</k>
                </MDBTypography>
              </MDBCol>
              
              <MDBCol sm='12' md='5'>
              <MDBRow>
                <MDBCol sm='2' md='1'> <MDBBadge color="primary" title="Last Picking before 15 days">{this.props.tpicking}</MDBBadge></MDBCol>
                <MDBCol sm='10' md='11'>  <MDBTypography><k>{this.props.Sku_name}</k></MDBTypography> </MDBCol>
              </MDBRow>               
              </MDBCol>


              <MDBCol >
                <k style={{color: '#262262'}}>Last Picking</k> 
                <MDBTypography>
                {/* 00-00-00 */}
                  <k>{this.props.last_pick}</k>
                </MDBTypography>
              </MDBCol>
              
              <MDBCol >
              <MDBRow>
               <img title="Wait time" src= {Tlogo} style={{maxWidth:'30px',marginTop:'auto', marginBottom:'auto'}}></img>
              
              <MDBCol  style={{fontSize:"17px", marginTop:'auto', marginBottom:'auto', textAlign: 'Left',}}>{this.props.waitTime}</MDBCol>
              </MDBRow>               
              </MDBCol>



              </MDBRow>
              
          </MDBCard>
        )
    }
}

export default AlertBox