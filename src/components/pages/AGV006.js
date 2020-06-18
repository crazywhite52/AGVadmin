import React, { PureComponent } from 'react'
import { MDBBtn, MDBJumbotron, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBTypography, MDBBox } from "mdbreact";
import ApiService from './../dataAPI/apiConnect';
import AuthService from '../authlogin/AuthService';
import { HorizontalBar, Bar, Polar, Line } from 'react-chartjs-2';
import windowSize from 'react-window-size';
import './css/agv006.css'
import socketIOClient from 'socket.io-client'

const socket = socketIOClient("http://172.18.24.113:8014")

class AGV006 extends PureComponent {
  constructor(props) {
    super(props)
    this.ApiCall = new ApiService();
    this.Auth = new AuthService();
    this.response = this.response.bind(this);
    this.state = {
      user: [],
      titleth1: '',
      titleth2: '',
      titleth3: '',
      titleth4: '',
      titleth5: '',
      titleth6: '',
      titleth7: '',
      titleth8: '',
      titleth9: '',
      titleth10: '',
      AllData: [],
      message: [],
      total1: 0,
      total2: 0,
      total3: '--',
      total4: 0,
      total5: 0,
      total6: 0,
      total7: 0,
      total8: 0,
      total9: 0,
      total10: '--',
      datechart_title: [],
      datechart_in: [],
      datechart_out: [],
      dataChartAll: [],
      dataPieAll: [],
      AGV003Data: '',
      AGV002Data: '',
      AGV006PData: '',
      dataBartitle: '',
      dataBarTotalIn: '',
      calIn: 0,
      calOut: 0,
      dataLine: '',
      dataLineTotal: '',
      JDCTotal: '',
      LZDTotal: '',
      SHPTotal: '',
      ATTotal: '',
      dataLineP: '',
      dataLineTotalP: '',
      JDCTotalP: '',
      LZDTotalP: '',
      SHPTotalP: '',
      ATTotalP: '',
      windowHeight: 0,
      total_wait: '',
      // endpoint: "http://172.18.0.135:5012", // เชื่อมต่อไปยัง url ของ realtime server

    }
  }

  componentDidMount() {

    if (this.props.windowHeight === 1080) {
      this.setState({
        windowHeight: 200
      })
    }
    this.response()
    this.response2()
    this.response3()
    this.response4()
    this.response5()
    // this.socket.on("dashboardAGV001", data => console.log(data));
    // console.group('componentDidMount');
    // console.log('dashboardAGV001');
    // console.groupEnd();
    //this.QRtest();
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
  // รอรับข้อมูลเมื่อ server มีการ update
  response = () => {
    const { endpoint, message } = this.state
    const temp = message

    socket.on('dashboardAGV001', (data) => {
      this.setState({
        message: 0,
        total1: 0
      }, () => {
        this.setState({
          titleth1: data.agv001[0][0].title,
          titleth2: data.agv001[0][1].title,
          titleth3: data.agv001[0][2].title_th,
          titleth4: data.agv001[0][3].title,
          titleth5: data.agv001[0][4].title,
          titleth6: data.agv001[0][5].title,
          titleth7: data.agv001[0][6].title,
          titleth8: data.agv001[0][7].title,
          titleth9: data.agv001[0][8].title,
          titleth10: data.agv001[0][9].title_th,
          total1: data.agv001[0][0].total,
          total2: data.agv001[0][1].total,
          total3: this.secondsToHms(data.agv001[0][2].total),
          total4: data.agv001[0][3].total,
          total5: data.agv001[0][4].total,
          total6: data.agv001[0][5].total,
          total7: data.agv001[0][6].total,
          total8: data.agv001[0][7].total,
          total9: data.agv001[0][8].total,
          total10: this.secondsToHms(data.agv001[0][9].total),
        }, () => {
          // const tt = eval(this.state.total3 + this.state.total10)

          const t01 = parseInt(data.agv001[0][3].total, 10)
          const t02 = parseInt(data.agv001[0][7].total, 10)
          const resultPlus1 = this.plus(t01)
          const resultPlus2 = this.plus(t02)
          //console.log(t01);
          this.setState({
            calIn: resultPlus1.toFixed(),
            calOut: resultPlus2.toFixed()
          })
        })
        //console.log(this.state.total3)
        //console.group('response');
        //console.log(data.agv001[0][0].title_th);
        //console.log(data);
        //console.groupEnd();
        //console.log(this.state.AllData[0].title_th);

      })
    })

  }
  plus = (val) => {
    return (val) / 14;
  }

  response2 = () => {
    const { endpoint, message } = this.state
    const temp = message

    socket.on('dashboardAGV002', (AGV002) => {
      this.setState({
        message: 0,
      }, () => {

        //console.log(AGV002.agv002[0]);
        let newarr = Array();
        let newarrIn = Array();
        let newarrOut = Array();
        AGV002.agv002[0].map((todo, index) =>
          newarr.push(todo.title)
        );
        AGV002.agv002[0].map((todo, index) =>
          newarrIn.push(todo.totalIn)
        );
        AGV002.agv002[0].map((todo, index) =>
          newarrOut.push(todo.totalOut)
        );
        //console.log(newarr);
        this.setState({
          datechart_title: newarr,
          datechart_in: newarrIn,
          datechart_out: newarrOut
        })

      })
    })
  }
  response3 = () => {
    const { endpoint, message } = this.state
    const temp = message

    socket.on('dashboardAGV003', (AGV003) => {


      this.setState({
        AGV003Data: AGV003.agv003[0],
        timeTitle0: '',
        totalOrder0: '',
        timeTitle1: '',
        totalOrder1: '',
        timeTitle2: '',
        totalOrder2: '',
        timeTitle3: '',
        totalOrder3: '',
        timeTitle4: '',
        totalOrder4: '',
        timeTitle5: '',
        totalOrder5: '',
        timeTitle6: '',
        totalOrder6: '',
        timeTitle7: '',
        totalOrder7: '',
        timeTitle8: '',
        totalOrder8: '',
        timeTitle9: '',
        totalOrder9: '',
        timeTitle10: '',
        totalOrder10: '',
        timeTitle11: '',
        totalOrder11: '',
        timeTitle12: '',
        totalOrder12: '',
        timeTitle13: '',
        totalOrder13: '',
        timeTitle14: '',
        totalOrder14: '',
      }, () => {

        //console.log(this.secondsToHms(this.state.InWaitTime))
        //console.group('response2');
        //console.log(data.agv001[0][0].title_th);
        //console.group('response3');
        //console.log(this.state.AGV003Data[12].totalOrder);
        //console.log(JSON.stringify(AGV003));
        //console.groupEnd();
        //console.log(this.state.AGV003Data);

        let newarr = Array();
        let OLTotal = Array();
        let JDCTotal = Array();
        let LZDTotal = Array();
        let SHPTotal = Array();
        let ATTotal = Array();
        this.state.AGV003Data.map((todo, index) =>
          newarr.push(todo.timeTitle),

        );
        this.state.AGV003Data.map((todo2, index) =>
          OLTotal.push(todo2.OLTotal)
        );
        this.state.AGV003Data.map((todo2, index) =>
          JDCTotal.push(todo2.JDCTotal)
        );
        this.state.AGV003Data.map((todo2, index) =>
          LZDTotal.push(todo2.LZDTotal)
        );
        this.state.AGV003Data.map((todo2, index) =>
          SHPTotal.push(todo2.SHPTotal)
        );
        this.state.AGV003Data.map((todo2, index) =>
          ATTotal.push(todo2.ATTotal)
        );
        this.setState({
          dataLine: newarr,
          dataLineTotal: OLTotal,
          JDCTotal: JDCTotal,
          LZDTotal: LZDTotal,
          SHPTotal: SHPTotal,
          ATTotal: ATTotal
          //SHPTotal: SHPTotal
        })
        //console.log(newarr)

      })
    })
  }
  response4 = () => {
    const { endpoint, message } = this.state
    const temp = message

    socket.on('dashboardAGV006P', (AGV006P) => {
      this.setState({
        AGV006PData: AGV006P.agv006P[0],
      }, () => {
        //console.log(this.state.AGV006PData)
        let newarr = Array();
        let OLTotal = Array();
        let JDCTotal = Array();
        let LZDTotal = Array();
        let SHPTotal = Array();
        let ATTotal = Array();

        this.state.AGV006PData.map((todo, index) =>
          newarr.push(todo.timeTitle),
        );
        this.state.AGV006PData.map((todo2, index) =>
          OLTotal.push(todo2.OLTotal)
        );
        this.state.AGV006PData.map((todo3, index) =>
          JDCTotal.push(todo3.JDCTotal)
        );
        this.state.AGV006PData.map((todo4, index) =>
          LZDTotal.push(todo4.LZDTotal)
        );
        this.state.AGV006PData.map((todo5, index) =>
          SHPTotal.push(todo5.SHPTotal)
        );
        this.state.AGV006PData.map((todo6, index) =>
          ATTotal.push(todo6.ATTotal)
        );

        this.timeout = setTimeout(() => {
          this.setState({
            dataLineP: newarr,
            dataLineTotalP: OLTotal,
            JDCTotalP: JDCTotal,
            LZDTotalP: LZDTotal,
            SHPTotalP: SHPTotal,
            ATTotalP: ATTotal
          })
        }, 1000);


      })
    })
  }
  response5 = () => {
    const { endpoint, message } = this.state
    const temp = message

    socket.on('waitToagv', (Wtagv) => {
      //console.log(Wtagv.agvonline[0].total_wait)
      this.setState({
        total_wait: Wtagv.agvonline[0].total_wait
      })
    })
  }


  render() {

    const { total1, total2, total3, total4, total5, total6, total7, total8, total9, total10, titleth1, titleth2, titleth3, titleth4, titleth5, titleth6, titleth7, titleth8, titleth9, titleth10,
      calIn, calOut } = this.state
    const pad = { 'padding-right': '8px', 'padding-left': '8px' }

    const data = {

      labels: this.state.datechart_title,
      datasets: [
        {
          label: 'InBoundBill',
          backgroundColor: 'rgba(31, 58, 147, 1)',
          borderColor: 'rgba(31, 58, 147, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(77, 5, 232, 1)',
          hoverBorderColor: 'rgba(77, 5, 232, 1)',
          data: this.state.datechart_in
        },
        {
          label: 'OutBoundBill',
          backgroundColor: 'rgba(217, 30, 24, 1)',
          borderColor: 'rgba(217, 30, 24, 1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(207, 0, 15)',
          hoverBorderColor: 'rgba(207, 0, 15)',
          data: this.state.datechart_out
        }
      ],

    };

    const data2 = {
      labels: [titleth1, titleth2, titleth4, titleth5, titleth6, titleth7, titleth9, titleth8],
      datasets: [
        {
          label: "Today's data",
          data: [total1, total2, total4, total5, total6, total7, total9, total8],
          fill: false,
          backgroundColor: [
            'rgba(255, 99, 132)',
            'rgba(255, 159, 64)',
            'rgba(255, 205, 86)',
            'rgba(75, 192, 192)',
            'rgba(54, 162, 235)',
            'rgba(153, 102, 255)',
            'rgba(230, 14, 111)',
            'rgba(71, 225, 16)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgba(230, 14, 111)',
            'rgba(71, 225, 167)'
          ],
          borderWidth: 1
        }
      ]
    }


    const dataLine = {

      labels: this.state.dataLine,

      datasets: [
        {
          label: "Online",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(31, 58, 147, 0.5)",
          borderColor: "rgba(31, 58, 147)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(31, 58, 147)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.dataLineTotal
        },
        {
          label: "Shopee",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(249, 105, 14, 0.6)",
          borderColor: "rgba(249, 105, 14)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(249, 105, 14)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.SHPTotal
        },
        {
          label: "Lazada",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(102, 51, 153, 0.5)",
          borderColor: "rgba(102, 51, 153)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(102, 51, 153)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.LZDTotal
        },
        {
          label: "JD",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(207, 0, 15, 0.5)",
          borderColor: "rgba(207, 0, 15, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(207, 0, 15, 1)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.JDCTotal
        },
        {
          label: "Other",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(0, 230, 64, 0.5)",
          borderColor: "rgba(0, 230, 64, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0, 230, 64, 1)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.ATTotal
        },


      ]
    };
    const dataLineP = {

      labels: this.state.dataLineP,

      datasets: [
        {
          label: "Online",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(31, 58, 147, 0.5)",
          borderColor: "rgba(31, 58, 147)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(31, 58, 147)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.dataLineTotalP
        },
        {
          label: "Shopee",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(249, 105, 14, 0.6)",
          borderColor: "rgba(249, 105, 14)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(249, 105, 14)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.SHPTotalP
        },
        {
          label: "Lazada",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(102, 51, 153, 0.5)",
          borderColor: "rgba(102, 51, 153)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(102, 51, 153)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.LZDTotalP
        },
        {
          label: "JD",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(207, 0, 15, 0.5)",
          borderColor: "rgba(207, 0, 15, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(207, 0, 15, 1)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.JDCTotalP
        },
        {
          label: "Other",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(0, 230, 64, 0.5)",
          borderColor: "rgba(0, 230, 64, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(0, 230, 64, 1)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 2,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 0,
          pointRadius: 2,
          pointHitRadius: 10,
          data: this.state.ATTotalP
        },


      ]
    };


    //windowHeight

    return (
      <div>
        <MDBContainer fluid style={{ 'padding-top': '20px', 'color': 'white' }}>
          <MDBRow>
            <MDBCol md="6"><MDBRow>
              <MDBCol md="4" style={{ 'padding-left': '10px', 'padding-right': '10px', 'padding-bottom': '15px' }}>
                <MDBCard className="chart-card">
                  <MDBCardBody className="Fcolor">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="text-center">{titleth1}</div>
                        <div className="text-center"><MDBTypography className="" tag="h3" variant="display-4"><strong style={{ color: '#76ff03' }}>{total1}</strong></MDBTypography></div>
                      </MDBCol>
                      <MDBCol size="6" >
                        <div className="text-center">{titleth4}</div>
                        <div className="text-center"><MDBTypography className="" tag="h3" variant="display-4"><strong style={{ color: '#76ff03' }}>{total4}</strong></MDBTypography></div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4" style={{ 'padding-right': '10px', 'padding-left': '10px' }}>
                <MDBCard className="chart-card">
                  <MDBCardBody className="Fcolor">
                    <MDBRow>
                      <MDBCol size="6" style={{ 'padding-right': '5px', 'padding-left': '5px' }}>
                        <div className="text-center">{titleth7}</div>
                        <div className="text-center"><MDBTypography tag="h3" colorText="deep-orange" variant="display-4"><strong>{total7}</strong></MDBTypography></div>
                      </MDBCol>
                      <MDBCol size="6" style={{ 'padding-right': '5px', 'padding-left': '5px' }}>
                        <div className="text-center">{titleth8}</div>
                        <div className="text-center"><MDBTypography tag="h3" colorText="deep-orange" variant="display-4"><strong>{total8}</strong></MDBTypography></div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol md="4" style={{ 'padding-right': '10px', 'padding-left': '10px' }}>
                <MDBCard className="chart-card">
                  <MDBCardBody className="Fcolor">
                    <MDBRow>
                      <MDBCol size="6">
                        <div className="text-center">{titleth6}</div>
                        <div className="text-center"><MDBTypography tag="h3" colorText="yellow" variant="display-4"><strong>{total6}</strong></MDBTypography></div>
                      </MDBCol>
                      <MDBCol size="6">
                        <div className="text-center">{titleth9}</div>
                        <div className="text-center"><MDBTypography tag="h3" colorText="yellow" variant="display-4"><strong>{total9}</strong></MDBTypography></div>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
              <MDBRow>
                <MDBCol style={pad} size="6" >
                  <MDBCard className="chart-card">
                    <MDBCardBody className="Fcolor" style={{ 'padding-top': '10px', 'padding-bottom': '17px' }}>
                      <MDBRow>
                        <MDBCol size="6" >
                          {titleth3}
                          <MDBTypography colorText="yellow" tag="h3" variant="display-6"><k>{total3 == '' ? '--' : total3}</k></MDBTypography>
                          {titleth10}
                          <MDBTypography colorText="yellow" tag="h3" variant="display-6"><k>{total10 == '' ? '--' : total10}</k></MDBTypography>
                        </MDBCol>
                        <MDBCol size="6">
                          In bill/hr.
                          <MDBTypography colorText="yellow" tag="h3" variant="display-6"><k>{calIn}</k></MDBTypography>
                          Out Order/hr.
                          <MDBTypography colorText="yellow" tag="h3" variant="display-6"><k>{calOut}</k></MDBTypography>
                        </MDBCol>
                      </MDBRow>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol style={pad} size="6">
                  <MDBCard className="chart-card">
                    <MDBCardBody className="Fcolor" style={{ 'padding-top': '10px', 'padding-bottom': '17px' }}>
                      <MDBRow>
                        <MDBCol size="6">
                          {titleth2}
                          <MDBTypography tag="h3" colorText="yellow" variant="display-6"><strong>{total2}</strong></MDBTypography>
                          {titleth5}
                          <MDBTypography colorText="yellow" tag="h3" variant="display-6"><k>{total5}</k></MDBTypography>
                        </MDBCol>
                        <MDBCol size="6">
                          <div className="text-center">ออเดอร์รอเข้า AGV</div>
                          <div className="text-center"> <MDBTypography tag="h3" colorText="yellow" variant="display-4"><strong>{this.state.total_wait}</strong></MDBTypography></div>

                        </MDBCol>

                      </MDBRow>

                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBCol md="6" >
              <MDBCard style={{ 'background-color': '#F0F3F4' }} className="chart-card"  >
                <MDBCardBody className="Fcolor3">
                  จำนวนเบิก
                  <Line
                    height={'82'}
                    options={{ responsive: true }}
                    data={dataLine}
                    options={{
                      responsive: true,
                      legend: {
                        labels: {
                          fontColor: "black",
                          fontSize: 13
                        }
                      },
                      scales: {
                        yAxes: [{
                          ticks: {
                            fontColor: "black",
                            fontSize: 13,
                            stepSize: 20,
                            beginAtZero: true
                          }
                        }],
                        xAxes: [{
                          ticks: {
                            fontColor: "black",
                            fontSize: 13,
                            //stepSize: 20,
                            beginAtZero: true
                          }
                        }]
                      }
                    }}
                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          <MDBRow style={{ marginTop: '10px' }}>
            <MDBCol size="6" style={pad}>
              <MDBCard style={{ 'background-color': 'rgba(29, 27, 65, 0.6)' }} className="chart-card">
                <MDBCardBody className="Fcolor">
                  ข้อมูลย้อนหลัง
                                    <Bar
                    data={data}

                    options={{
                      responsive: true,
                      legend: {
                        labels: {
                          fontColor: "white",
                          fontSize: 13
                        }
                      },
                      scales: {
                        yAxes: [{
                          ticks: {
                            fontColor: "white",
                            fontSize: 13,
                            //stepSize: 20,
                            beginAtZero: true
                          }
                        }],
                        xAxes: [{
                          ticks: {
                            fontColor: "white",
                            fontSize: 13,
                            //stepSize: 20,
                            beginAtZero: true
                          }
                        }]
                      }
                    }}

                  />
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol size="6" style={{ 'padding-left': '0px', 'padding-right': '0px' }}>
              <MDBCol>
                <MDBCard style={{ 'background-color': '#F0F3F4' }} className="chart-card"  >
                  <MDBCardBody className="Fcolor3">
                    จำนวนหยิบ
                    <Line
                      height={'62'}
                      options={{ responsive: true }}
                      data={dataLineP}
                      options={{
                        responsive: true,
                        legend: {
                          labels: {
                            fontColor: "black",
                            fontSize: 13
                          }
                        },
                        scales: {
                          yAxes: [{
                            ticks: {
                              fontColor: "black",
                              fontSize: 13,
                              stepSize: 20,
                              beginAtZero: true
                            }
                          }],
                          xAxes: [{
                            ticks: {
                              fontColor: "black",
                              fontSize: 13,
                              //stepSize: 20,
                              beginAtZero: true
                            }
                          }]
                        }
                      }}
                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol style={{ 'padding-top': '10px' }}>
                <MDBCard style={{ 'background-color': 'rgba(29, 27, 65, 0.6)' }} className="chart-card">
                  <MDBCardBody className="Fcolor">
                    ข้อมูลวันปัจจุบัน
                                    <HorizontalBar
                      data={data2}
                      height={'65'}
                      options={{
                        responsive: true,
                        legend: {
                          labels: {
                            fontColor: "white",
                            fontSize: 14
                          }
                        },
                        scales: {
                          yAxes: [{
                            ticks: {
                              fontColor: "white",
                              fontSize: 14,
                              stepSize: 50,
                              beginAtZero: true
                            }
                          }],
                          xAxes: [{
                            ticks: {
                              fontColor: "white",
                              fontSize: 14,
                              stepSize: 50,
                              beginAtZero: true
                            }
                          }]
                        }
                      }}

                    />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBCol>
          </MDBRow>


        </MDBContainer>
      </div>
    )
  }
}

export default windowSize(AGV006)
