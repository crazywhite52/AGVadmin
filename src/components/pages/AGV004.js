import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBInput, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, } from "mdbreact";
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import './input.css';
import AGV004_TB from './JqxGrid/tb_AGV004';
import loadgif from './../img/login-back.gif'
import tenor from './../img/Antu_task-complete.svg.png'

class AGV004 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.EnterSentVal = this.EnterSentVal.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            product: '',
            loading: false,
            profile: {},
            productdetail: []
        }
    }

    componentWillMount() {
        if (!this.Auth.loggedIn()) {
            this.props.history.replace('/login')
        }
        else {
            try {
                const profile = this.Auth.getProfile()
                this.setState({
                    user: profile
                })
            }
            catch (err) {
                this.Auth.logout()
                this.props.history.replace('/login')
            }
        }
    }
    componentDidMount() {
        const profile = this.Auth.getProfile();
        this.setState({ profile: profile }, () => {
        });

    }
    handleChange(e) {
        e.preventDefault();
        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
            }
        );
    }
    EnterSentVal() {


        //getSkuFromItec
        this.ApiCall.getSkuFromItec(this.state.product)
            .then(res => {

                this.setState({
                    productdetail: res
                }, () => {
                    console.group('getSkuFromItec');
                    console.log(this.state.productdetail);
                    console.groupEnd();
                })
            }).catch(error => {
                console.error(error.message);
            });
    }

    render() {
        const sty1 = { 'padding-top': '0px', 'padding-bottom': '0px', 'padding-left': '5px', 'padding-right': '5px', }
        const psty = { 'padding-top': '4px', 'padding-bottom': '4px', 'margin-bottom': '0px', 'font-size': '12px' }
        return (
            <div>
                <MDBContainer fluid>
                    <MDBCard style={{ width: "", marginTop: "1rem" }}>
                        <MDBCardHeader color="deep-orange lighten-1"><MDBIcon icon="save" /> นำสินค้าเข้า AGV Manual (AGV004)</MDBCardHeader>
                        <MDBCardBody style={{ 'padding-top': '0px' }}>
                            <MDBInput
                                label="Product Code"
                                outline
                                type="text"
                                name="product"
                                className="col-md-2 col-sm-4 col-xs-4 col-lg-2"
                                onChange={this.handleChange}
                                onKeyPress={(event) => {
                                    if (event.key === "Enter") {
                                        // console.group('Value Enter');
                                        // console.log(this.state.docid);
                                        // console.groupEnd();
                                        this.EnterSentVal();
                                    }
                                }}

                                autoFocus
                            />

                            <AGV004_TB
                                PickData={this.state.productdetail}
                            />

                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}

export default withSnackbar(AGV004)