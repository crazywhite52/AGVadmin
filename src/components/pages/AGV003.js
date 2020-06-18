import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBInput, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, } from "mdbreact";
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import AGV003_TB from './JqxGrid/tb_AGV003';
import './input.css';
import loadgif from './../img/login-back.gif'
import tenor from './../img/Antu_task-complete.svg.png'

class AGV003 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.EnterSentVal = this.EnterSentVal.bind(this);
        this.ApipickingManualist = this.ApipickingManualist.bind(this);
        this.ConfirM = this.ConfirM.bind(this);
        this.Success = this.Success.bind(this);
        this.ApigetPickingday = this.ApigetPickingday.bind(this);
        this.ValuePickCancel = this.ValuePickCancel.bind(this);

        this.state = {
            product: '',
            loading: false,
            profile: {},
            datapick: '',
            productcode: '',
            productname: '',
            remark: '',
            value: 1,
            showForm: false,
            modal: false,
            Pickingday: [],
            billNumber:''
        }
    }
    ValuePickCancel(val) {
        this.setState({
            loading: true,
        });
        console.group('ValuePickCancel');
        console.log(val);
        console.groupEnd();

        let datasend = Array();
        datasend = {
            "billNumber": val
        }

        this.ApiCall.pickingCancel(datasend)
            .then(res => {

                console.group('pickingCancel');
                console.log(res);
                console.groupEnd();

                if (res.status === true) {
                    if (res.resAGV) {
                        console.group('resAGV');
                        console.log(res.resAGV);
                        console.groupEnd();

                        const message = 'บันทึกข้อมูลเรียบร้อยแล้ว';
                        this.props.enqueueSnackbar(
                            message, {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center',
                            },
                        });

                        this.timeout = setTimeout(() => {
                            window.location.reload();
                        }, 2000);

                    } else {
                        const message = res.msg;
                        this.props.enqueueSnackbar(
                            message, {
                            variant: 'warning',
                            anchorOrigin: {
                                vertical: 'top',
                                horizontal: 'center',
                            },
                        });
                        this.setState({
                            loading: false,
                        });
                    }
                } else {

                }


            }).catch(error => {
                console.error(error.message);
            });



    }
    ApigetPickingday() {

        this.ApiCall.getPickingday()
            .then(res => {


                this.setState({
                    loading: false,
                    Pickingday: res.data
                }, () => {
                    // console.group('getPickingday');
                    // console.log(this.state.Pickingday);
                    // console.groupEnd();
                })

            }).catch(error => {
                console.error(error.message);
            });

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
        this.setState({
            loading: true
        }, () => {
            this.timeout = setTimeout(() => {
                this.ApigetPickingday();
            }, 500)
        })


        const profile = this.Auth.getProfile();
        this.setState({ profile: profile }, () => {
            // console.group('Value props');
            // console.log(this.state);
            // console.groupEnd();
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
    ApipickingManualist() {
        const procode = this.state.product
        const username = this.state.user.username
        const fullname = this.state.user.fullname
        const shipToName = username + ' ' + fullname
        let datasend = Array();
        datasend = {
            skuCode: procode,
            shipToName: shipToName
        };

        this.ApiCall.pickingManualist(datasend)
            .then(res => {

                if (res.status === true) {
                    // console.group('Value handleChange');
                    // console.log(res);
                    // console.groupEnd();
                    this.setState({
                        datapick: res.data.details
                    }, () => {
                        // console.group('Value datapick');
                        // console.log(res.data.shipToName);
                        // console.groupEnd();

                        this.setState({
                            showForm: true,
                            shipToName: res.data.shipToName,
                            billType: res.data.billType,
                            remark: res.data.remark,
                            productcode: this.state.datapick[0].productcode,
                            productname: this.state.datapick[0].productname,
                        })
                    })
                } else {
                    // console.group('Value error');
                    // console.log(res);
                    // console.groupEnd();
                    this.setState({
                        showForm: false
                    })
                    const message = 'ไม่พบข้อมูลสินค้า ในระบบ AGV';
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
            .catch(error => {
                console.group('Value error');
                console.error(error.message);
                console.groupEnd();

            });

    }
    EnterSentVal(e) {
        //alert(this.state.docid)
        if (this.state.product === undefined || this.state.product === '') {
            const message = 'กรุณากรอก Product!!';
            this.props.enqueueSnackbar(
                message, {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        } else {
            this.setState({
                loading: true,
                showForm: true
            }, () => {

                // const message = this.state.product;
                // this.props.enqueueSnackbar(
                //     message, {
                //     variant: 'info',
                //     anchorOrigin: {
                //         vertical: 'top',
                //         horizontal: 'center',
                //     },
                // });
                this.timeout = setTimeout(() => {
                    this.ApipickingManualist();
                    this.setState({
                        loading: false
                    })
                }, 1000);
            })


        }

    }
    ConfirM() {
        this.setState({
            loading: true
        })
        const username = this.state.user.username
        const fullname = this.state.user.fullname
        const shipToName = username + ' ' + fullname


        let datasend = Array();
        datasend = {
            "billType": this.state.billType,
            "billNumber": this.state.billNumber,
            "shipToName": shipToName,
            "remark": this.state.remark,
            "details":
            {
                "skuCode": this.state.productcode,
                "skuName": this.state.productname,
                "quantity": this.state.value
            }

        }

        // console.group('Value datasend');
        // console.log(JSON.stringify(datasend));
        // console.groupEnd();


        this.ApiCall.callPickingManua(datasend)
            .then(res => {
                // console.group('Value callPickingManua');
                // console.log(res);
                // console.groupEnd();

                //modal: !this.state.modal

                if (res.status === false) {

                    const message = res.message;
                    this.props.enqueueSnackbar(
                        message, {
                        variant: 'warning',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                    this.setState({ loading: false })
                } else {

                    if (res.resultMessage.statusBill === true) {

                        if (res.resultMessage.responseAGV.header.resultcode) {
                            const message = res.resultMessage.msg;
                            this.timeout = setTimeout(() => {
                                this.props.enqueueSnackbar(
                                    message, {
                                    variant: 'success',
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                    },
                                });
                                this.setState({
                                    modal: !this.state.modal
                                }, () => {
                                    console.group('res.resultMessage.responseAGV.header.resultcode');
                                    console.log(res);
                                    console.groupEnd();
                                })
                            }, 2000)
                        }

                    } else {
                        if (res.resultMessage.responseAGV) {
                            this.setState({ loading: false })
                            const message = res.resultMessage.responseAGV.header.resultmsg;
                            this.props.enqueueSnackbar(
                                message, {
                                variant: 'warning',
                                anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                },
                            });
                            this.timeout = setTimeout(() => {
                                window.location.reload();
                            }, 5000)
                        } else {
                            console.group('res.resultMessage.responseAGV');
                            console.log(res);
                            console.groupEnd();
                            this.setState({ loading: false,billNumber:res.billNumber })
                            const message = 'เกิดปัญหาการเชือมต่อกรุณาลองใหม่อีกครั้ง';
                            this.props.enqueueSnackbar(
                                message, {
                                variant: 'warning',
                                anchorOrigin: {
                                    vertical: 'top',
                                    horizontal: 'center',
                                },
                            });
                            this.timeout = setTimeout(() => {
                                //window.location.reload();
                            }, 5000)
                        }

                    }
                }
            }).catch(error => {
                console.log(error.message);
                this.setState({ loading: false, modal: !this.state.modal })
                const message = 'บันทึกข้อมูลเรียบร้อยแล้ว';
                this.props.enqueueSnackbar(
                    message, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                });
                this.timeout = setTimeout(() => {
                    //window.location.reload();
                }, 5000)

            });
    }
    render() {

        const { productcode, productname, shipToName, billType, remark, showForm } = this.state
        const psty = { 'padding-top': '0px', 'padding-bottom': '0px', 'margin-bottom': '0px', 'font-size': '15px' }
        // let durationBody = datapick.map((item, i) => {
        //     return (
        //         <li key={i} value={item}>
        //             {item.productcode}  {item.productname}
        //         </li>
        //     );
        // });

        return (
            <div>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} backdrop={false} centered>
                    <MDBModalHeader toggle={false}>บันทึกข้อมูลเรียบร้อยแล้ว</MDBModalHeader>
                    <MDBModalBody>
                        <div align="center"><img width="250" src={tenor} alt="success"></img></div>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn onClick={this.Success} color="primary"> ตกลง</MDBBtn>
                    </MDBModalFooter>
                </MDBModal>

                <MDBContainer fluid>
                    <MDBCard style={{ width: "", marginTop: "1rem" }}>
                        <MDBCardHeader color="deep-orange lighten-1">เบิกสินค้าจาก AGV (AGV003)</MDBCardHeader>
                        <LoadingOverlay active={this.state.loading} spinner text="loading...">
                            <MDBCardBody>
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
                                {showForm === true ?
                                    <LoadingOverlay active={false} spinner text="loading...">
                                        <b>billType: </b>{billType}
                                        <blockquote className="blockquote mb-0 card-body">
                                            <p style={psty}><b>Product Code:</b> {productcode}</p>
                                            <p style={psty}><b>Product Name:</b> {productname}</p>
                                            <p style={psty}><b>Quantity</b></p>
                                            <div style={{ 'margin-bottom': '0px' }} className="def-number-input number-input">
                                                <button onClick={this.decrease} className="minus"></button>
                                                <input className="quantity" name="quantity" value={this.state.value} onChange={() => console.log('change')}
                                                    type="number" />
                                                <button onClick={this.increase} className="plus"></button>
                                            </div>
                                            <MDBInput
                                                size="md"
                                                type="text"
                                                label="remark"
                                                outline name="remark"
                                                onChange={this.handleChange}
                                                value={this.state.remark} />
                                            <footer className="blockquote-footer">
                                                <small className="text-muted">
                                                    <b>shipToName:</b>{" "}
                                                    <cite title="Source Title">{this.state.shipToName}</cite>
                                                </small>
                                            </footer>
                                        </blockquote>
                                        <MDBBtn color="deep-orange" onClick={this.ConfirM} ><MDBIcon icon="check-circle" /> ยืนยัน</MDBBtn>
                                    </LoadingOverlay>
                                    : ''}
                                <p>รายการเบิกภายในวัน</p>
                                <AGV003_TB
                                    PickData={this.state.Pickingday}
                                    SendPickCancel={this.ValuePickCancel}
                                />
                            </MDBCardBody>
                        </LoadingOverlay>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}

export default withSnackbar(AGV003)