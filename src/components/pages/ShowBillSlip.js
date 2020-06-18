import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCardImage, MDBRow, MDBCol, MDBInput, MDBIcon, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import axios, { post } from 'axios';
import withAuth from './../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import update from 'react-addons-update';
import ShowInbound from './ShowBillSlip';
import driving from './../img/driving-agv.jpg';
import './input.css';
import GridJqx from './JqxGrid/tb_showinbound';
import loadgif from './../img/login-back.gif'
import tenor from './../img/Antu_task-complete.svg.png'
import './css/agv006.css'
class ShowBillSlip extends PureComponent {
    state = this.props.initialState
    constructor(props) {
        super(props)

        this.BtgetForInbound = this.BtgetForInbound.bind(this);
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.decrease = this.decrease.bind(this);
        this.increase = this.increase.bind(this);
        this.SaveData = this.SaveData.bind(this);
        this.Updatedata = this.Updatedata.bind(this);
        this.Success = this.Success.bind(this);

        this.state = {
            ForInboundData: [],
            ForInboundData2: [],
            alldata: [],
            value: 0,
            loading: false,
            gifloading: false,
            modal: false,
            billNumber: ''
        }


    }


    Success() {

        window.location.reload();

    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    decrease = () => {
        this.setState({ value: this.state.value - 1 });
    }

    increase = () => {
        this.setState({ value: this.state.value + 1 });
    }
    BtgetForInbound() {

        this.setState({ loading: true })
        this.timeout = setTimeout(() => {
            this.ApiCall.getForInbound(this.props.BF, this.props.ID, 0).then(res => {

                console.group('Send to API getForInbound');
                console.log(res);
                console.groupEnd();

                if (res.success === true) {
                    this.setState({
                        alldata: res,
                        ForInboundData: res.details,
                        loading: false,
                        billNumber: res.billNumber
                    }, () => {

                    })
                } else {
                    const message = res;
                    this.props.enqueueSnackbar(
                        message, {
                        variant: 'warning',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                }
            })
        }, 1000);
    }
    Updatedata(rowdata) {


        this.setState(update(this.state, {
            ForInboundData: {
                [rowdata.boundindex]: {
                    $set: {
                        boxno: rowdata.boxno,
                        skuCode: rowdata.skuCode,
                        name: rowdata.name,
                        quantity: rowdata.quantity,
                    }

                }
            }
        }), () => {

        });

    }

    SaveData() {

        this.setState({
            loading: true
        })
        const datares = this.state.ForInboundData;
        let newArray = Array();
        for (var x in datares) {
            newArray.push({
                ["boxNo"]: datares[x].boxno,
                ["skuCode"]: datares[x].skuCode,
                ["quantity"]: datares[x].quantity,

            });
        }
        let spacedata = Array();
        spacedata = [
            {
                "billNumber": this.state.alldata.billNumber,
                //"billType": this.state.alldata.billType,
                "billDate": this.state.alldata.billDate,
                "details": newArray
            }
        ]

        this.ApiCall.callInBound(spacedata)
            .then(res => {
                console.group('Send to API callInBound');
                console.log(res);
                console.groupEnd();
                if (res.status == true) {

                    if (res.response) {
                        const message = 'บันทึกข้อมูลสำเร็จ';
                        this.props.enqueueSnackbar(
                            message, {
                            variant: 'success',
                            autoHideDuration: '2000',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center',
                            },
                        });

                        var msg = "The order " + this.state.billNumber + " has been already existed";
                        if (res.response.header.resultcode == 'ERROR_IS_ORDER' && res.response.header.resultmsg == msg) {
                            console.group('Send to API requestid');
                            console.log(res.response.header.requestid);
                            console.groupEnd();

                            this.setState({ gifloading: true, loading: true })
                            this.timeout = setTimeout(() => {
                                //const message = 'บันทึกข้อมูลเรียบร้อยแล้ว';
                                this.timeout = setTimeout(() => {
                                    this.setState({ gifloading: false, modal: !this.state.modal }, () => {
                                        this.timeout = setTimeout(() => {
                                            //this.Success();
                                            window.location.reload();
                                        }, 500);
                                    })
                                }, 1000);
                            }, 1500)
                        } else {
                            this.setState({ gifloading: true, loading: true })
                            this.timeout = setTimeout(() => {
                                //const message = 'บันทึกข้อมูลเรียบร้อยแล้ว';
                                this.timeout = setTimeout(() => {
                                    this.setState({ gifloading: false, modal: !this.state.modal }, () => {
                                        this.timeout = setTimeout(() => {
                                            //this.Success();
                                            window.location.reload();
                                        }, 500);
                                    })
                                }, 1000);
                            }, 1500)
                        }
                    } else {
                        const message = 'Not Responding กรุณาลองใหม่อีกครั้ง';
                        this.props.enqueueSnackbar(
                            message, {
                            variant: 'warning',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center',
                            },
                        });
                        this.setState({
                            loading: false
                        })

                    }
                }

            })
            .catch(error => {
                console.error(error.message);
                const message = error.message;
                this.props.enqueueSnackbar(
                    message, {
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
                this.setState({
                    loading: false
                })
            });
    }
    componentDidMount() {

        this.BtgetForInbound();

    }
    render() {
        const data = this.state.ForInboundData;
        const { gifloading } = this.state;
        return (
            <div>

                {/* <MDBModal isOpen={this.state.modal} toggle={this.toggle} backdrop={false} centered>

                    <MDBModalHeader>บันทึกข้อมูลเรียบร้อยแล้ว</MDBModalHeader>
                    <MDBModalBody>
                        <div align="center"><img width="250" src={tenor} alt="success"></img></div>

                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" onClick={this.Success} color="primary"> ตกลง</MDBBtn>
                    </MDBModalFooter>

                </MDBModal> */}

                <MDBCardBody className="cardcus">
                    <MDBCardTitle>BillType: {this.state.alldata.billType}</MDBCardTitle>
                    <MDBCardText>
                        <MDBRow>
                            <MDBCol md="3">
                                <MDBRow>
                                    <MDBCol ><p><b style={{ 'color': '#00d6b4' }}>billNumber:</b> <g style={{ 'color': '#fff' }}>{this.state.alldata.billNumber}</g></p></MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol ><p><b style={{ 'color': '#00d6b4' }}>billDate:</b> <g style={{ 'color': '#fff' }}>{this.state.alldata.billDate}</g></p></MDBCol>
                                </MDBRow>
                            </MDBCol>
                            <MDBCol md="9">
                                {gifloading === true ? <div align="center">
                                    <p style={{ 'margin-bottom': '0px' }}><b>กำลังบันทึกข้อมูลกรุณารอสักครู่...</b></p>
                                    <img width="550" src={loadgif} alt="loading"></img>
                                </div> : ''}
                            </MDBCol>
                        </MDBRow>
                        {/* <p><b>billNumber:</b> {this.state.alldata.billNumber}</p>
                            <p><b>billDate:</b> {this.state.alldata.billDate}</p> */}
                    </MDBCardText>
                </MDBCardBody>
                <LoadingOverlay active={this.state.loading} spinner text="loading...">
                    <MDBBtn onClick={this.SaveData} color="deep-orange" size="lg"><MDBIcon icon="save" /> ส่งข้อมูล</MDBBtn>
                    <GridJqx ViewData={this.state.ForInboundData} updatedata={this.Updatedata} />
                </LoadingOverlay>
            </div>
        )
    }
}

export default withSnackbar(ShowBillSlip)