import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardGroup, MDBContainer, MDBTable, MDBTableBody, MDBTableHead, MDBRow, MDBCol, MDBCardFooter, MDBTypography, MDBBtn, MDBIcon, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter } from "mdbreact";
import LoadingOverlay from "react-loading-overlay";
import ApiService from '../../authlogin/AuthService'
import './../css/agv006.css'
class Panels extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        // this.Auth = new AuthService();
        this.state = {
            Data: [],
            FindData: [],
            modal: false,
            billNumber: '',
            loading: false
        }
    }
    componentDidMount() {
        this.timeout = setTimeout(() => {
            this.Pdata()

        }, 1500)


    }
    toggleClose = () => {

        this.setState({
            modal: false
        }, () => {
            this.Pdata()
        })
    }
    toggle = (e) => {


        // console.group('find Data Res');
        // console.log(result);
        // console.groupEnd();
        let modalNumber = 'modal' + e

        this.setState({
            modal: !this.state[modalNumber],
            billNumber: e
        }, () => {

            this.ArrayFind()
        });
    }

    Pdata = () => {
        this.setState({ loading: true }, () => {
            this.setState({
                Data: this.props.Data
            }, () => {
                this.setState({
                    loading: false
                })
                // console.group('props Pdata Res');
                // console.log(this.state.Data);
                // console.groupEnd();
            })
        })

    }

    ArrayFind = () => {

        const result = this.state.Data.find(({ billNumber }) => billNumber === this.state.billNumber);
        this.setState({ FindData: result.Product }, () => {
            console.group('props Pdata Res');
            console.log(this.state.FindData);
            console.groupEnd();
        })
    }
    chkSave = (billNumber) => {
        this.timeout = setTimeout(() => {
            if (this.props.Save === true) {
                //window.location.reload();
                this.toggleClose()
                this.timeout = setTimeout(() => {
                    let modalNumber = 'modal' + billNumber
                    this.setState({
                        modal: !this.state[modalNumber]
                    })
                }, 1500)
            }

        }, 1500)
    }
    // AddSku = (pcode, pname) => {

    //     let datasend_ex = Array();
    //     datasend_ex = {
    //         "billNumber": this.state.billNumber,
    //         "skuCode": pcode,
    //         "name": pname
    //     }
    //     console.group('AddSku');
    //     console.log(datasend_ex);
    //     console.groupEnd();

    //     this.ApiCall.createBySku(datasend_ex)
    //         .then(res => {
    //             console.group('createBySku');
    //             console.log(res);
    //             console.groupEnd();
    //         }).catch(error => {
    //             console.error(error.message);
    //         });
    // }
    render() {
        const { Data, billNumber } = this.state
        const list = Data.map((todo, index) =>
            <LoadingOverlay active={this.state.loading} spinner text="loading...">
                <MDBCardGroup style={{ 'margin-left': '2px', 'margin-right': '2px' }} deck>
                    <MDBCard className="cardcus">
                        <MDBCardBody>
                            <MDBCardTitle tag="h5"><strong>{todo.billNumber}</strong></MDBCardTitle>
                            <MDBCardText>
                                <MDBTypography colorText="orange" tag='h1' variant="h1">Pending</MDBTypography>
                            </MDBCardText>
                            <div align="center">
                                <MDBBtn className="" size="sm" color="cyan"
                                    onClick={() => {
                                        this.toggle(todo.billNumber)
                                    }}
                                ><MDBIcon far icon="folder-open" /> VIEW PRODUCT</MDBBtn></div>
                        </MDBCardBody>
                        <MDBCardFooter small muted>
                            จำนวนสินค้า {todo.Product.length} รายการ
          </MDBCardFooter>
                    </MDBCard>

                </MDBCardGroup>
            </LoadingOverlay>
        )


        return (
            <div>
                {/* {list} */}
                <MDBContainer>
                    <MDBModal size="lg" isOpen={this.state.modal} toggle={this.toggleClose}>
                        <MDBModalHeader className="cardcus">billNumber : {billNumber}</MDBModalHeader>
                        <MDBModalBody className="cardcus">
                            <MDBTable style={{ 'color': '#00d6b4', 'font-weight': '800' }} className="table table-hover" small>
                                <MDBTableHead>
                                    <tr>
                                        <th>#</th>
                                        <th>Product</th>
                                        <th>ProductName</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-center">Create</th>
                                    </tr>
                                </MDBTableHead>
                                <MDBTableBody>
                                    {this.state.FindData.map((mdata, index) =>
                                        <tr key={index}>
                                            <td><strong>{index + 1}</strong></td>
                                            <td><strong>{mdata.Product}</strong></td>
                                            <td><strong>{mdata.ProductName}</strong></td>
                                            <td><strong>{mdata.Qty}</strong></td>
                                            <td align="center">{mdata.create_status == 1 ?
                                                <MDBBtn className="" onClick={() => {
                                                    this.props.SendSku(billNumber, mdata.Product, mdata.ProductName)
                                                    this.chkSave(billNumber)
                                                }} size="sm" gradient="peach">Add</MDBBtn>
                                                : '✅'}</td>
                                        </tr>
                                    )}
                                </MDBTableBody>

                            </MDBTable>

                        </MDBModalBody>
                        <MDBModalFooter className="cardcus">
                            <MDBBtn color="secondary" onClick={this.toggleClose}>Close</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    
                </MDBContainer>

                
                    
                

            </div>
        )
    }
}

export default Panels