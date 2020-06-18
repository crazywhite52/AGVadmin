import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBRow, MDBCol, MDBCardText, MDBCardHeader, MDBBtn, MDBContainer, MDBTypography, MDBInput, MDBIcon, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, } from "mdbreact";
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import AGV005_TB from './JqxGrid/tb_AGV005';

class AGV005 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.ApigetStockzero = this.ApigetStockzero.bind(this);
        this.state = {
            loading: false,
            profile: {},
            reportdata: [],
            count: ''
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

        this.setState({
            loading: true
        }, () => {
            this.timeout = setTimeout(() => {
                this.ApigetStockzero();
            }, 1500)
        })

        setInterval(() => {

            this.setState({
                loading: true
            }, () => {
                this.timeout = setTimeout(() => {
                    this.ApigetStockzero();
                    this.setState({
                        loading: false
                    })
                }, 1000)
            })
        }, 350000);


    }
    ApigetStockzero() {

        this.ApiCall.getStockzero()
            .then(res => {


                if (res.success == true) {
                    this.setState({
                        loading: false,
                        reportdata: res.data
                    }, () => {
                        // console.group('getStockzero');
                        // console.log(this.state.reportdata);
                        // console.groupEnd();


                        const result = this.state.reportdata.find(task => (task.skuStock === 0));

                        // console.group('find Array');
                        // console.log(result);
                        // console.groupEnd();

                        const ssac = this.state.reportdata.filter(person => person.skuStock == 0 && person.skuBilltrn == 0).map((Person, index) => (
                            console.log(Person)
                        ))
                        this.setState({
                            count: ssac.length
                        })
                        //console.log(ssac.length)
                    })
                } else {
                    const message = 'เกิดข้อผิดพลาดไม่สามารถโหลดข้อมูล';
                    this.props.enqueueSnackbar(
                        message, {
                        variant: 'warning',
                        anchorOrigin: {
                            vertical: 'top',
                            horizontal: 'center',
                        },
                    });
                }

            }).catch(error => {
                console.error(error.message);
            });

    }


    render() {
        return (
            <div>
                <MDBContainer fluid>
                    <br></br>

                    <MDBRow>
                        <MDBCol>
                            <h3 style={{ 'color': '#00d6b4' }} className="font-weight-bold">แสดงสินค้าคงเหลือ (AGV005)</h3>
                        </MDBCol>
                    </MDBRow>



                    <LoadingOverlay active={this.state.loading} spinner text="loading...">
                        <MDBRow>
                            <MDBCol>
                                <AGV005_TB Data={this.state.reportdata} />
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol>
                                <MDBTypography note noteColor='danger' noteTitle='จำนวนสินค้าคงเหลือ AGV เป็น 0 ทั้งหมด: '>
                                    <strong>{this.state.count}</strong>{' '} รายการ
                                </MDBTypography>

                            </MDBCol>
                        </MDBRow>
                    </LoadingOverlay>
                </MDBContainer>
            </div>
        )
    }
}

export default withSnackbar(AGV005)