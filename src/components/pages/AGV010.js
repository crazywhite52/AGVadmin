import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBCardTitle, MDBInput, MDBCardText, MDBCardHeader, MDBBtn, MDBNotification } from "mdbreact";
import TbGrid10 from './JqxGrid/tb_AGV010';
import withAuth from '../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from '../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import Addpro from './panel/Addnewpro';

class AGV010 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.state = {
            loading: false,
            noti: false,
            search_txt: null,
            Datasku: [],
            modal: false,
            message: '',
            response: ''
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
    handleChange = (e) => {
        e.preventDefault();

        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                // console.group('Value handleChange');
                // console.log(this.state.docid);
                // console.groupEnd();
            }
        );
    }

    EnterSentVal = () => {
        if (this.state.search_txt == ' ' || this.state.search_txt == 'undefined' || this.state.search_txt == null) {
            const message = 'กรุณากรอกข้อมูลที่ต้องการค้นหา';
            this.props.enqueueSnackbar(
                message, {
                variant: 'warning',
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'center',
                },
            });
        } else {

            let datasend = Array();
            datasend = {
                txtsearch: this.state.search_txt
            }

            this.ApiCall.searchProduct(datasend)
                .then(res => {
                    // console.group('Value getSkuFromItec');
                    // console.log(res);
                    // console.groupEnd();
                    if (res.status === true) {
                        this.setState({
                            loading: true
                        }, () => {
                            this.timeout = setTimeout(() => {
                                this.setState({ Datasku: res.data, loading: false })
                            }, 1500)

                        })
                    } else {
                        const message = 'SearchProduct Error';
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
                    console.group('Value error');
                    console.error(error.message);
                    console.groupEnd();

                });
        }

    }
    Updateflag = (pro, fg) => {
        //console.log(pro)
        var st = null;
        if (fg === 0) {
            var st = 1;
        } else {
            var st = 0;
        }
        let datasend = Array();
        datasend = {
            "productcode": pro,
            "flag": st
        }

        this.ApiCall.updateFlag(datasend)
            .then(res => {
                // console.group('Value updateFlag');
                // console.log(res);
                // console.groupEnd();
                if (res.status === true) {
                    this.EnterSentVal();
                }
            }).catch(error => {
                console.group('Value error');
                console.error(error.message);
                console.groupEnd();

            });

    }
    SaveProduct = (product) => {
        let datasend = Array();
        datasend = {
            "productcode": product
        }
        this.ApiCall.updateNewproduct(datasend)
            .then(res => {
                // console.group('Value updateNewproduct');
                // console.log(res);
                // console.groupEnd();
                if (res.status === true) {
                    this.setState({
                        message: res,
                        response: res.response,
                        modal: !this.state.modal,
                        search_txt: product,
                        noti: true
                    }, () => {
                        this.EnterSentVal();
                        this.timeout = setTimeout(() => {
                            this.setState({ noti: false })
                        }, 2500)
                    });
                }

            }).catch(error => {
                console.group('Value updateNewproduct');
                console.error(error.message);
                console.groupEnd();

            });



    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }
    closeModal = (e) => {
        this.setState({
            modal: e
        });
    }

    render() {
        const { noti } = this.state

        const notiupdate = <>

            <MDBNotification
                bodyClassName="p-3"
                show
                fade
                iconClassName="text-success"
                title="Status"
                message={this.state.message.message}
                text={this.state.response.timestamp}
                style={{
                    width: '300px',
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999
                }}
            />

        </>


        return (
            <div>
                <MDBContainer fluid>
                    {noti === false ? '' : notiupdate}
                    <MDBCard style={{ marginTop: "1rem" }}>
                        <MDBCardHeader color="primary-color" tag="h4">
                            เอาสินค้าเข้า/ออก จากระบบ AGV (AGV010)
    </MDBCardHeader>
                        <MDBCardBody>
                            <MDBRow>
                                <MDBCol md="4">
                                    <MDBInput label="ค้นหา"
                                        type="text"
                                        onChange={this.handleChange}
                                        name="search_txt"
                                        outline
                                        onKeyPress={(event) => {
                                            if (event.key === "Enter") {
                                                // console.group('Value Enter');
                                                // console.log(this.state.docid);
                                                // console.groupEnd();
                                                this.EnterSentVal();
                                            }
                                        }}
                                        value={this.state.search_txt}
                                        autoFocus

                                    />
                                </MDBCol>
                                <MDBCol md="2">
                                    <MDBBtn onClick={this.toggle} style={{ marginTop: 22 }} size="md" color="primary"><MDBIcon icon="cart-plus" /> Newproduct</MDBBtn>
                                </MDBCol>
                            </MDBRow>
                            <Addpro
                                SendProduct={this.SaveProduct}
                                openModal={this.state.modal}
                                closeModal={this.closeModal} />
                            <LoadingOverlay active={this.state.loading} spinner text="loading...">
                                <TbGrid10
                                    Datasku={this.state.Datasku}
                                    Sendflag={this.Updateflag}
                                />
                            </LoadingOverlay>
                        </MDBCardBody>
                    </MDBCard>
                </MDBContainer>
            </div>
        )
    }
}

export default withSnackbar(AGV010)