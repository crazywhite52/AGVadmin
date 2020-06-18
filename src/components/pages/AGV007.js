import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBBadge, MDBCardText, MDBRow, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBAlert, MDBCol, MDBInput, MDBIcon, MDBCardHeader, MDBTypography, MDBBtn, MDBContainer, MDBCardFooter, MDBBox, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import './../pages/css/agv006.css';
import withAuth from './../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import Panl from './panel/Panels';
import loadgif from './../img/login-back.gif'

class AGV007 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.state = {
            loading: false,
            DataPending: [],
            ForInboundData: [],
            FindData: [],
            save: '',
            modal: false,
            accessapp: [],
            accessadmin: 0,
            profile: {},
            message: '',
            modal2: false
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
        let profile = this.Auth.getProfile();
        this.setState({ profile: profile });
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
        this.interval = setInterval(() => {
            //this.ViewData()
        }, 5000)
        this.ViewData()
    }
    ViewData = () => {
        this.setState({
            loading: true
        }, () => {
            this.timeout = setTimeout(() => {
                this.ApiCall.viewsPendingbill()
                    .then(res => {
                        console.group('viewsPendingbill');
                        console.log(res);
                        console.groupEnd();
                        if (res.status == false) {
                            //console.log(res.message);
                            this.setState({ message: res.message, loading: false })
                        } else {
                            if (res.success === true) {
                                this.setState({
                                    loading: false,
                                    DataPending: res.data
                                }, () => {
                                    // console.group('props Pdata Res');
                                    // console.log(this.state.DataPending);
                                    // console.groupEnd();
                                })
                            }
                        }
                    }).catch(error => {
                        console.error(error.message);
                    });
            }, 1000)
        })
    }
    AddSku = (billNumber, Product, ProductName) => {
        let datasend_ex = Array();
        datasend_ex = {
            "billNumber": billNumber,
            "skuCode": Product,
            "name": ProductName
        }
        this.ApiCall.createBySku(datasend_ex)
            .then(res => {
                // console.group('createBySku');
                // console.log(res);
                // console.groupEnd();
                this.toggleClose()
                if (res.status === true) {
                    const message = 'บันทึกข้อมูลสำเร็จ';
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
                        this.ViewData()
                        this.ArrayFind()
                        let modalNumber = 'modal' + billNumber
                        this.setState({
                            modal: !this.state[modalNumber]
                        })
                    }, 1000)
                    //this.setState({ save: res.status })
                }
            }).catch(error => {
                console.error(error.message);
            });
    }
    toggleClose = () => {
        this.setState({
            modal: false
        }, () => {
            //window.location.reload();
            this.setState({
                loading: false,
                DataPending: [],
                ForInboundData: [],
                FindData: [],
                save: '',
                modal: false,
                accessapp: [],
                accessadmin: 0,
                profile: {}
            }, () => {
                this.ViewData()
            });
        })
    }
    toggle = (e) => {
        let modalNumber = 'modal' + e
        this.setState({
            modal: !this.state[modalNumber],
            billNumber: e
        }, () => {
            this.ArrayFind()
        });
    }
    ArrayFind = () => {
        this.ViewData()
        this.timeout = setTimeout(() => {
            const result = this.state.DataPending.find(({ billNumber }) => billNumber === this.state.billNumber);
            this.setState({ FindData: result.Product }, () => {
                // console.group('props Pdata Res');
                // console.log(this.state.FindData);
                // console.groupEnd();
            })
        }, 1000)
    }
    toggle2 = () => {
        this.setState({
            modal2: !this.state.modal2
        });
    }
    SendAgv = (billNumber) => {
        var str = billNumber.split("-");
        var elem = str[0];
        var text = str[1];
        var integer1 = parseInt(text, 10);
        var integer2 = parseInt(elem, 10);
        this.ApiCall.getForInbound(integer1, integer2, 0).then(res => {
            // console.group('res');
            // console.log(res);
            // console.groupEnd();
            this.setState({ ForInboundData: res }, () => {
                if (res.success === true) {
                    const datares = this.state.ForInboundData.details;
                    //console.log(datares);
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
                            "billNumber": billNumber,
                            //"billType": this.state.alldata.billType,
                            "billDate": res.billDate,
                            "details": newArray
                        }
                    ]
                    // console.group('callInBound');
                    // console.log(spacedata);
                    // console.groupEnd();
                    this.setState({ modal2: true })
                    this.ApiCall.callInBound(spacedata)
                        .then(res => {
                            // console.group('callInBound');
                            // console.log(res);
                            // console.groupEnd();
                            if (res.status === true) {
                                const message = 'บันทึกข้อมูลเรียบร้อยแล้ว';
                                this.props.enqueueSnackbar(
                                    message, {
                                    variant: 'success',
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                    },
                                });
                                //this.ViewData()
                                this.timeout = setTimeout(() => {
                                    this.setState({ modal2: false })
                                    this.props.history.replace('/AGV001')
                                }, 1000)
                            } else {
                                const message = 'บันทึกข้อมูลไม่สำเร็จ';
                                this.props.enqueueSnackbar(
                                    message, {
                                    variant: 'danger',
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                    },
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error.message);
                        });
                }
            })
        }).catch(error => {
            console.error(error.message);
        });
    }
    render() {
        const { DataPending, billNumber, FindData, message } = this.state
        const td =
            FindData.map((mdata, index) =>
                <tr key={index}>
                    <td><strong>{index + 1}</strong></td>
                    <td><strong>{mdata.Product}</strong></td>
                    <td><strong>{mdata.ProductName}</strong></td>
                    <td><strong>{mdata.Qty}</strong></td>
                    <td align="center">{mdata.create_status === 1 ? '❌' : '✅'}</td>
                    <td align="center">
                        {mdata.create_status === 1 ? <MDBBtn className="" onClick={() => {
                            this.AddSku(billNumber, mdata.Product, mdata.ProductName)
                        }} size="sm" gradient="peach">Add</MDBBtn> : '✅'}
                    </td>
                </tr>
            )
        return (
            <LoadingOverlay active={this.state.loading} spinner text="loading..." >
                <MDBContainer style={{ marginTop: "1rem" }} fluid>
                    <MDBContainer>
                        <MDBModal isOpen={this.state.modal2} toggle={this.toggle2}>
                            <MDBModalHeader >กำลังบันทึกข้อมูล</MDBModalHeader>
                            <MDBModalBody>
                                <div align="center"><img width="400" src={loadgif} alt="success"></img></div>
                            </MDBModalBody>
                        </MDBModal>
                    </MDBContainer>
                    {/* <Panl Data={DataPending} SendSku={this.AddSku} Save={this.state.save} /> */}
                    <MDBRow>
                        <MDBCol size="12">
                            <MDBCard style={{ width: "", marginTop: "" }}>
                                <MDBCardHeader className="cardcus"><h3>แสดงสถานะ Pending ของสินค้าโอนเข้า (AGV007)</h3></MDBCardHeader>
                                <MDBCardBody className="cardcus">
                                    <MDBBadge color="danger">Pedding</MDBBadge>
                                    <MDBBadge color="success-color">Success</MDBBadge>
                                    {/* <MDBCardTitle>Special title treatment</MDBCardTitle> */}
                                    <MDBRow>
                                        <MDBCol className="text-center" size="12">
                                            {message}
                                        </MDBCol>
                                    </MDBRow>
                                    {DataPending.map((data, index) =>
                                        <MDBCardText className="">
                                            {data.complete === true ? '' : <MDBAlert
                                                className={data.status_create === false ? 'cardcus2' : 'cardcus3'} >
                                                <MDBRow>
                                                    <MDBCol size="1" style={{ 'padding-top': '15px' }}>
                                                        <div align="center"><a href="#!" onClick={() => {
                                                            this.toggle(data.billNumber)
                                                        }}><MDBIcon size="2x" className="indigo-text pr-3" icon="search" /></a></div>
                                                    </MDBCol>
                                                    <MDBCol size="3">
                                                        <MDBBox><b>เลขที่บิล</b> </MDBBox>
                                                        <MDBBox tag="span"></MDBBox>
                                                        <b style={{ fontSize: 20 }}>{data.billNumber}</b>
                                                    </MDBCol>
                                                    <MDBCol size="3">
                                                        <MDBBox><b>จำนวนสินค้า </b></MDBBox>
                                                        <MDBBox tag="span"></MDBBox>
                                                        <b style={{ fontSize: 20 }}>{data.Product.length}</b>
                                                    </MDBCol>
                                                    <MDBCol size="3">
                                                        <MDBBox><b>วันเวลา ที่โอนล่าสุด</b></MDBBox>
                                                        <MDBBox tag="span">
                                                            <b style={{ fontSize: 20 }}>{data.createDate}</b>
                                                        </MDBBox>
                                                    </MDBCol>
                                                    <MDBCol size="2">
                                                        {data.complete == false && data.status_create == false && data.status_ord == false ? '' :
                                                            data.status_ord == true ? '' :
                                                                <div className="text-right">
                                                                    <MDBBtn size="md" color="mdb-color"
                                                                        onClick={() => {
                                                                            this.SendAgv(data.billNumber)
                                                                        }}
                                                                    ><MDBIcon icon="paper-plane" /> ส่งอีกครั้ง</MDBBtn>
                                                                </div>
                                                        }


                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBAlert>
                                            }
                                        </MDBCardText>
                                    )}
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                    <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggleClose} backdrop={true}>
                        <MDBModalHeader className="cardcus">billNumber : {billNumber}</MDBModalHeader>
                        <MDBModalBody className="cardcus">
                            <MDBTable style={{ 'color': '#00d6b4', 'font-weight': '800' }} className="table table-hover" small>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>ProductName</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Create</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {td}
                                </MDBTableBody>
                            </MDBTable>
                        </MDBModalBody>
                        <MDBModalFooter className="cardcus">
                            <MDBBtn color="secondary" onClick={this.toggleClose}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </LoadingOverlay >
        )
    }
}

export default withSnackbar(AGV007)