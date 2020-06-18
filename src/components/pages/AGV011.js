import React, { PureComponent } from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBTypography, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBCardText, MDBCardHeader, MDBBtn } from "mdbreact";
import './../pages/css/agv011.css';
import withAuth from '../authlogin/withAuth';
import LoadingOverlay from "react-loading-overlay";
import { withSnackbar } from "notistack";
import ApiService from '../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import socketIOClient from 'socket.io-client'
const socket = socketIOClient("http://172.18.24.113:8014")
class AGV011 extends PureComponent {
    constructor(props) {
        super(props)
        this.ApiCall = new ApiService();
        this.Auth = new AuthService();
        this.state = {
            message: [],
            user: [],
            loading: false,
            DataAgv011: '',
            title: '',
            wait: '',
            totalAll: '',
            complateYes: '',
            complateNo: '',
            totalPending: '',
            time_avg0: '00:00:00',
            time_avg1: '00:00:00',
            time_avg2: '00:00:00',
            time_avg3: '00:00:00',
            time_avg4: '00:00:00',
            time_avg5: '00:00:00',
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
        //console.log(this.props.windowHeight);
    }
    componentDidMount() {

        this.response();
    }
    secondsToHms = (seconds) => {
        if (!seconds) return '00:00:00';
        let duration = seconds;
        let hours = duration / 3600;
        duration = duration % (3600);
        let min = parseInt(duration / 60);
        duration = duration % (60);
        let sec = parseInt(duration);
        console.log(min);

        if (min < 0) {
            return '00:00:00';
        } else {

            if (sec < 10) {
                sec = `0${sec}`;
            }
            if (min < 10) {
                min = `0${min}`;
            }

            if (parseInt(hours, 10) > 0) {
                return `${parseInt(hours, 10)}:${min}:${sec}`
            }
            else if (min == 0) {
                return `00:00:${sec}`
            }
            else {
                return `00:${min}:${sec}`
            }
        }
    }
    response = () => {
        const { endpoint, message } = this.state
        const temp = message
        this.setState({ loading: true })
        

        socket.on('dashboardAGV011', (data) => {
            //console.log(data);
            this.timeout = setTimeout(() => {
                this.setState({ loading: false }, () => {
                    this.setState({ DataAgv011: data.agv011[0] }, () => {

                        let Arr1 = Array();
                        let Arr2 = Array();
                        let Arr3 = Array();
                        let Arr4 = Array();
                        let Arr5 = Array();
                        let Arr6 = Array();
                        this.state.DataAgv011.map((todo, index) =>
                            Arr1.push(todo.title)
                        );
                        this.state.DataAgv011.map((todo, index) =>
                            Arr2.push(todo.totalWait)
                        );
                        this.state.DataAgv011.map((todo, index) =>
                            Arr3.push(todo.complateYes)
                        );
                        this.state.DataAgv011.map((todo, index) =>
                            Arr4.push(todo.complateNo)
                        );
                        this.state.DataAgv011.map((todo, index) =>
                            Arr5.push(todo.totalPending)
                        );
                        this.state.DataAgv011.map((todo, index) =>
                            Arr6.push(todo.totalAll)
                        );
                        console.log(this.state.DataAgv011)
                        this.setState({
                            title: Arr1,
                            wait: Arr2,
                            complateYes: Arr3,
                            complateNo: Arr4,
                            totalPending: Arr5,
                            totalAll: Arr6,
                            time_avg0: this.secondsToHms(this.state.DataAgv011[0].time_avg),
                            time_avg1: this.secondsToHms(this.state.DataAgv011[1].time_avg),
                            time_avg2: this.secondsToHms(this.state.DataAgv011[2].time_avg),
                            time_avg3: this.secondsToHms(this.state.DataAgv011[3].time_avg),
                            time_avg4: this.secondsToHms(this.state.DataAgv011[4].time_avg),
                            time_avg5: this.secondsToHms(this.state.DataAgv011[5].time_avg),
                        }, () => {
                           
                        })
                    })
                })
            }, 1500)
        })


    }

    render() {
        const { title, wait, complateYes, complateNo, totalPending, totalAll, loading } = this.state;

        const t1 = parseInt(totalAll[0])
        const t2 = parseInt(totalPending[0])
        const w0 = parseInt(wait[0])
        const w1 = parseInt(wait[1])
        const w2 = parseInt(wait[2])
        const w3 = parseInt(wait[3])
        const w4 = parseInt(wait[4])
        const w5 = parseInt(wait[5])
        const t3 = parseInt(totalAll[1])
        const t4 = parseInt(totalPending[1])
        const t5 = parseInt(totalAll[2])
        const t6 = parseInt(totalPending[2])
        const t7 = parseInt(totalAll[3])
        const t8 = parseInt(totalPending[3])
        const t9 = parseInt(totalAll[4])
        const t10 = parseInt(totalPending[4])
        const t11 = parseInt(totalAll[5])
        const t12 = parseInt(totalPending[5])
        const sum = (t1 + w0);
        const sum2 = (t3 + t5 + t7 + t9 + t11);

        var nf = new Intl.NumberFormat();
        const res1 = nf.format(sum);
        const res2 = nf.format(sum2);
        const pend2 = nf.format(totalPending[1]);
        const spinner = (
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
        return (
            <div>
                <MDBContainer style={{ marginTop: "2rem" }} fluid>
                    <MDBRow>
                        <MDBCol>
                            <MDBTypography tag="h4" variant="display-4" className="text-center"><k className="txt">AGV ORDER PROCESS</k></MDBTypography>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>

                        <MDBCol size="1">
                            <div className="box-1" align="center">
                                <b className="txtH">{title[0]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[0]}</p></MDBTypography>
                            </div>
                        </MDBCol>

                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-2" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }} ><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[0]}</p></MDBTypography>
                                {this.state.time_avg0}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[0]} | No {loading == true ? spinner : complateNo[0]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalPending[0]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="3" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}>
                            <div className="txttotal">Today Total Document : {loading == true ? spinner : res1}</div>
                        </MDBCol>

                    </MDBRow>
                    <MDBRow>
                        <MDBCol size="12">
                            <div className="Line1"></div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>
                        <MDBCol size="1">
                            <div className="box-ol" align="center">
                                <b className="txtH">{title[1]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[1]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-w" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }}><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[1]}</p></MDBTypography>
                                {this.state.time_avg1}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[1]} | No {loading == true ? spinner : complateNo[1]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : pend2}</p></MDBTypography>
                            </div>
                        </MDBCol>

                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>
                        <MDBCol size="1">
                            <div className="box-sp" align="center">
                                <b className="txtH">{title[2]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[2]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-w" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }}><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[2]}</p></MDBTypography>
                                {this.state.time_avg2}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[2]} | No {loading == true ? spinner : complateNo[2]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalPending[2]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>
                        <MDBCol size="1">
                            <div className="box-lz" align="center">
                                <b className="txtH">{title[3]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[3]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-w" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }}><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[3]}</p></MDBTypography>
                                {this.state.time_avg3}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[3]} | No {loading == true ? spinner : complateNo[3]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalPending[3]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="3" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}>
                            <div className="txttotal">Today Total Document : {loading == true ? spinner : res2}</div>
                        </MDBCol>
                    </MDBRow>

                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>
                        <MDBCol size="1">
                            <div className="box-jd" align="center">
                                <b className="txtH">{title[4]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[4]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-w" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }}><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[4]}</p></MDBTypography>
                                {this.state.time_avg4}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[4]} | No {loading == true ? spinner : complateNo[4]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalPending[4]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <br></br>
                    <MDBRow>
                        <MDBCol size="1">{''}</MDBCol>
                        <MDBCol size="1">
                            <div className="box-other" align="center">
                                <b className="txtH">{title[5]}</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalAll[5]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-w" align="center">
                                <b className="txtH">Wait</b>
                                <MDBTypography colorText="white" style={{ 'margin-bottom': '0px' }}><p style={{ fontSize: 25, 'margin-bottom': '0px' }}>{loading == true ? spinner : wait[5]}</p></MDBTypography>
                                {this.state.time_avg5}
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className="Arrow"></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-3" align="center">
                                <b className="txtH">Complete</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 20 }}>Yes {loading == true ? spinner : complateYes[5]} | No {loading == true ? spinner : complateNo[5]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                        <MDBCol size="1" style={{ 'margin-left': '0px', 'padding-left': '55px', 'padding-top': '35px' }}><div className=""></div></MDBCol>
                        <MDBCol size="1">
                            <div className="box-4" align="center">
                                <b className="txtH">Pending</b>
                                <MDBTypography colorText="white" ><p style={{ fontSize: 25 }}>{loading == true ? spinner : totalPending[5]}</p></MDBTypography>
                            </div>
                        </MDBCol>
                    </MDBRow>

                </MDBContainer>
            </div>
        )
    }
}

export default AGV011