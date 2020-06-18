import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBInput, MDBIcon, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import Grid from './JqxGrid/tb_AGV002';
import axios, { post } from 'axios';
import withAuth from './../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import update from 'react-addons-update';

class CancelProduct extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            loading: false,
            docid: '',
            StockNot: [],
            StockNot2: [],
            ID: '',
            BF: ''
        }
    }
    handleChange(e) {
        e.preventDefault();
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                console.group('Value handleChange');
                console.log(this.state.docid);
                console.groupEnd();
            }
        );
    }

    render() {
        return (
            <MDBContainer fluid>
            <MDBCard style={{ width: "", marginTop: "1rem" }}>
                <MDBCardHeader color="deep-orange lighten-1"><MDBIcon icon="save" /> ยกเลิก สินค้าเข้า AGV (AGV002)</MDBCardHeader>
                <MDBCardBody style={{ 'padding-top': '0px' }}>
                    <MDBContainer fluid>
                        <MDBRow>
                            <MDBCol size="2">
                                <MDBInput
                                    label="product"
                                    outline
                                    type="text"
                                    name="docid"
                                    onChange={this.handleChange}
                                    onKeyPress={(event) => {
                                        if (event.key === "Enter") {
                                            // console.group('Value Enter');
                                            // console.log(this.state.docid);
                                            // console.groupEnd();
                                            //this.EnterSentVal();
                                        }
                                    }}
                                    autoFocus
                                />
                            </MDBCol>
                            <MDBCol size="4">
                                <div className="text-right" style={{ marginTop: 20 }}>
                                    {/* <MDBBtn onClick={this.ConfirM} color="dark-green">
                                        <MDBIcon icon="clipboard-check" /> บันทึกการทำรายการ
                                    </MDBBtn> */}
                                </div>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size="12">
                                <LoadingOverlay active={this.state.loading} spinner text="loading...">
                                    <Grid
                                        // ViewData={this.state.StockNot}
                                        // TypeProduct={this.TypeProduct}
                                    />
                                </LoadingOverlay>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>

                </MDBCardBody>

            </MDBCard>
        </MDBContainer>
        )
    }
}

export default withAuth(withSnackbar(CancelProduct))