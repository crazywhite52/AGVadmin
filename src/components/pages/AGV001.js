import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBInput, MDBIcon, MDBCardHeader, MDBTypography, MDBBtn, MDBContainer, MDBCardFooter, MDBBox, MDBTable, MDBTableHead, MDBTableBody } from "mdbreact";
import withAuth from '../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from '../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import update from 'react-addons-update';
import ShowInbound from './ShowBillSlip';
import './../pages/css/agv006.css';
import InputMask from 'react-input-mask';
import Modal from './panel/Modal';

class AGV001 extends PureComponent {

    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.handleChange = this.handleChange.bind(this);
        this.EnterSentVal = this.EnterSentVal.bind(this);
        this.GetDataProduct = this.GetDataProduct.bind(this);
        this.TypeProduct = this.TypeProduct.bind(this);
        this.ConfirM = this.ConfirM.bind(this);
        this.BtNextPage = this.BtNextPage.bind(this);

        this.state = {
            ShowInboundPage: false,
            ConfirMBt: false,
            stInbound: false,
            BtNext: false,
            AllDataBill: [],
            ProductBill: [],
            BillDoc: [],
            AllData: [],
            ForInboundData: '',
            DataApi: [],
            loading: false,
            docid: '',
            StockNot: [],
            StockNot2: [],
            ID: '',
            BF: '',
            disabled: false,
            disabledConfirM: false,
            Btpadding: false,
            modal: false
        }
    }
    componentDidMount() {
       
    }
    EnterSentVal(e) {
       
        if (this.state.docid === undefined || this.state.docid === '') {
            const message = 'กรุณากรอกเลขที่เอกสาร!!';
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
                loading: true
            }, () => {
                this.timeout = setTimeout(() => {
                    this.GetDataProduct(this.state.docid);
                    this.setState({
                        loading: false
                    })
                }, 1500);
            })


        }

    }

    TypeProduct(Type, product, ProductName, Qty, chk, rowindex) {


        this.setState(update(this.state, {
            StockNot2: {
                [rowindex]: {
                    $set: {
                        Product: product,
                        ProductName: ProductName,
                        Type: Type,
                        Qty: Qty,
                        chk: chk
                    }

                }
            }
        }), () => {
            console.group('Value ConfirM');
            console.log(this.state);
            console.groupEnd();
        });

    }
    ConfirM() {
        this.setState({
            loading: true,
            disabledConfirM: true
        })
        const chk = 1;
        this.Pending(chk);
        this.timeout = setTimeout(() => {

            this.setState({
                ShowInboundPage: true,
                loading: false
            })
        }, 3500);
    }
    Pending = (chk) => {

        this.setState({
            loading: true
        })

        let datasend_ex = {
            "ID": this.state.BillDoc[0]['ID'],
            "DocNo": this.state.BillDoc[0]['DocNo'],
            "DocRef": null,
            "BF": this.state.BillDoc[0]['BF'],
            "BranchFrom": this.state.BillDoc[0]['BranchFrom'],
            "BT": this.state.BillDoc[0]['BT'],
            "ToBranch": this.state.BillDoc[0]['ToBranch'],
            "OfID": this.state.BillDoc[0]['OfID'],
            "OfName": null,
            "Status": this.state.BillDoc[0]['Status'],
            "Received": this.state.BillDoc[0]['Received'],
            "Comment": "",
            "CreateTime": this.state.BillDoc[0]['CreateTime'],
            "UpdateTime": this.state.BillDoc[0]['UpdateTime'],
            "ProductBill": this.state.ProductBill
        }

        this.ApiCall.createPendingbill(datasend_ex)
            .then(res => {

                if (res.success === true) {
                    this.timeout = setTimeout(() => {
                        this.setState({
                            loading: false,
                            modal: false
                        }, () => {
                           
                            if (chk === 1) {

                            } else {
                                this.props.history.replace('/AGV007')
                            }
                        })
                    }, 1000)
                }
            }).catch(error => {
                console.error(error.message);
            });

    }
    GetDataProduct(val) {
        var str = val.split("-");

        var elem = str[0];
        var text = str[1];
        var integer1 = parseInt(text, 10);
        var integer2 = parseInt(elem, 10);

        if (!elem.match(/^([0-9,-])+$/i)) {
            const message = 'กรอกได้เฉพาะตัวเลข';
            this.props.enqueueSnackbar(
                message, {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });

        } else {

            if (typeof str[0] === undefined || str[1] === undefined) {
                const message = 'คีย์ข้อมูลไม่ถูกต้องกรุณาตรวจสอบใหม่';
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
                    ID: integer2,
                    BF: integer1
                }, () => {

                    this.ApiCall.agvInbound(this.state.BF, this.state.ID).then(res => {

                        if (res.success == true) {


                            if (res.status == false) {
                                const message = 'Status False : ไม่มี product ใน AGV';
                                this.props.enqueueSnackbar(
                                    message, {
                                    variant: 'warning',
                                    autoHideDuration: '3000',
                                    anchorOrigin: {
                                        vertical: 'top',
                                        horizontal: 'center',
                                    },
                                });
                                if (res.BillDoc == "I") {

                                } else {
                                    this.setState({
                                        ConfirMBt: true,
                                        ShowInboundPage: false,
                                        stInbound: true,
                                        disabled: true,
                                        BillDoc: res.BillDoc,
                                        ProductBill: res.ProductBill,
                                        Btpadding: true

                                    })
                                }


                            } else {

                                this.setState({
                                    stInbound: true,
                                    disabled: true,
                                    BillDoc: res.BillDoc,
                                    ProductBill: res.ProductBill
                                })
                            }
                            if (res.success == true && res.status == true) {
      
                                if (res.BillDoc[0].Received === 0 && res.BillDoc[0].Status === 0) {
                                    this.setState({
                                        ConfirMBt: true
                                    })
                                } else if (res.BillDoc[0].Status == 1) {

                                    const message = 'บิล Edit ';
                                    this.props.enqueueSnackbar(
                                        message, {
                                        variant: 'error',
                                        autoHideDuration: '5000',
                                        anchorOrigin: {
                                            vertical: 'top',
                                            horizontal: 'center',
                                        },
                                    });
                                } else {
                                    const message = 'สถานะต้องเป็น Received: 0, Status: 0 จึงจะสามารถเอาเข้า AGV ได้';
                                    this.props.enqueueSnackbar(
                                        message, {
                                        variant: 'error',
                                        autoHideDuration: '5000',
                                        anchorOrigin: {
                                            vertical: 'top',
                                            horizontal: 'center',
                                        },
                                    });
                                }

                            }

                        } else {
                            const message = 'ไม่สามารถทำรายการนี้ได้/หรือมีรายการนี้แล้ว';
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
                })

            }
        }

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

    BtNextPage() {
      
        this.setState({
            ShowInboundPage: true
        })

    }

  
    Test = () => {
        this.props.history.replace('/AGV007')
    }
    BtBackward = () => {
        window.location.reload();
    }
    Clmodal = () => {
        this.setState({
            modal: false
        }, () => {
            window.location.reload();
        });
    };
    render() {

        const sty1 = { 'padding-top': '0px', 'padding-bottom': '0px', 'padding-left': '5px', 'padding-right': '5px', }
        const psty = { 'padding-top': '4px', 'padding-bottom': '4px', 'margin-bottom': '0px', 'font-size': '12px' }
        const { stInbound, ConfirMBt, BtNext, ShowInboundPage, BillDoc, Btpadding } = this.state;


        const Hshow = stInbound === true ?
            <MDBRow>
                <MDBCol size="12">
                    <MDBCard className="cardcus">
                        <MDBCardHeader ><h3>ข้อมูลที่จะนำเข้า AGV Inbound (AGV001)</h3></MDBCardHeader>
                        <MDBCardBody className="cardcus">
                            <MDBTable style={{ 'color': '#00d6b4', 'font-weight': '800' }} className="table table-hover" small>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product Code</th>
                                        <th>Product Name</th>
                                        <th align="center">Qty</th>
                                        <th align="">Status</th>
                                    </tr>
                                </MDBTableHead>

                                {this.state.ProductBill.map((todo, index) =>
                                    <MDBTableBody>
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{todo.Product}</td>
                                            <td>{todo.ProductName}</td>
                                            <td>{todo.Qty}</td>
                                            <td align="center">{todo.chk === 1 ? '❌' : '✅'}</td>
                                        </tr>
                                    </MDBTableBody>
                                )}

                            </MDBTable>
                        </MDBCardBody>
                        <MDBCardFooter small muted>CreateTime : {BillDoc[0]['CreateTime']}</MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            : ''

        return (
            <div>
                <Modal
                    opModal={this.state.modal}
                    Clmodal={this.Clmodal}
                />
                <MDBContainer fluid>
                    <MDBCard style={{ marginTop: "1rem" }}>


                        <MDBCardHeader className="cardcus" ><MDBIcon icon="save" size="1x" /> <b>บันทึกสินค้าโอนเข้า AGV (AGV001)</b> </MDBCardHeader>
                        <MDBCardBody style={{ 'padding-top': '0px' }}>
                            <LoadingOverlay active={this.state.loading} spinner text="loading...">
                                {ShowInboundPage === true ? <ShowInbound ID={this.state.ID} BF={this.state.BF} /> :

                                    <MDBContainer fluid>
                                        <MDBRow>
                                            <MDBCol size="2">
                                                <div className="form-group" style={{ marginTop: 5 }}>
                                                    <label>เลขที่เอกสาร</label>
                                                    <InputMask
                                                        required
                                                        className="form-control"
                                                        type="text"
                                                        name="docid"
                                                        //mask="9999999-999"
                                                        disabled={this.state.disabled}
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
                                                </div>
                                            </MDBCol>
                                            <MDBCol size="6">

                                                {ConfirMBt === true ?
                                                    Btpadding === false ?
                                                        <MDBBtn style={{ marginTop: 27 }} onClick={this.ConfirM} color="dark-green" disabled={this.state.disabledConfirM}>
                                                            <MDBIcon icon="clipboard-check" /> บันทึกการทำรายการ </MDBBtn>
                                                        :
                                                        <MDBBtn style={{ marginTop: 27 }} onClick={this.Pending} color="amber">
                                                            <MDBIcon icon="clipboard-check" /> คลิกเพื่อส่งไปหน้า Create Product (Pending) </MDBBtn>

                                                    : <MDBBtn style={{ marginTop: 27 }} onClick={this.BtBackward} color="dark"><MDBIcon icon="undo-alt" /> ย้อนกลับ </MDBBtn>}


                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol size="12">

                                                {Hshow}
                                                <br />
                                                {BtNext === true ?
                                                    <MDBCard>
                                                        <MDBCardBody>
                                                            <MDBCardTitle>{''}</MDBCardTitle>
                                                            <MDBCardText><MDBTypography tag='h1' variant="h1">มีรายการ Product แล้ว</MDBTypography></MDBCardText>
                                                            <MDBBtn color="primary" onClick={this.BtNextPage}><MDBIcon icon="chevron-circle-right" /> ไปยังขั้นตอนต่อไป</MDBBtn>
                                                        </MDBCardBody>
                                                    </MDBCard>
                                                    : ''
                                                    // <Card />

                                                    // <Grid
                                                    //     ViewData={this.state.AllData}
                                                    //     TypeProduct={this.TypeProduct}
                                                    // />
                                                }



                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                }
                            </LoadingOverlay>
                        </MDBCardBody>

                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}

export default withAuth(withSnackbar(AGV001))