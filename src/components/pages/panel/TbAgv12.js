import React, { PureComponent } from 'react'
import {
  MDBContainer,
  MDBPagination,
  MDBPageItem,
  MDBPageNav,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBTypography,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBBox
} from 'mdbreact'
import LoadingOverlay from 'react-loading-overlay'
import socketIOClient from 'socket.io-client'


const socket = socketIOClient('http://172.18.24.113:8014')

class TbAgv12 extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      loading: true,
      dataagv: [],
      bodydata1H: [],
      bodydata2H: [],
      bodydata3H: [],
      startDate: new Date()
    }
  }
  componentDidMount () {
    this.dashboradAgv12()
  }
  
  dashboradAgv12 = () => {
    socket.on('dashboardAGV012', data => {
      this.setState(
        {
          dataagv: data.agv012[0]
        },
        () => {
          this.setState({ loading: true }, () => {
            this.loopdata()
          })
          // console.group('dataagv')
          // console.log(this.state.dataagv)
          // console.groupEnd()
        }
      )
    })
  }
  loopdata = () => {
    //console.log(this.state.dataagv.length)
    let arr = Array()
    var dataagv = this.state.dataagv
    for (let index = 0; index < dataagv.length; index++) {
      //console.log(dataagv[index].value)
      arr.push(dataagv[index].value)
    }
    //console.log(arr)

    this.setState(
      {
        bodydata1H: arr[0],
        bodydata2H: arr[1],
        bodydata3H: arr[2]
      },
      () => {
        this.setState({ loading: false })
      }
    )
  }

  secondsToHms = seconds => {
    if (!seconds) return '00:00:00'
    let duration = seconds
    let hours = duration / 3600
    duration = duration % 3600
    let min = parseInt(duration / 60)
    duration = duration % 60
    let sec = parseInt(duration)

    if (min < 0) {
      return '00:00:00'
    } else {
      if (sec < 10) {
        sec = `0${sec}`
      }
      if (min < 10) {
        min = `0${min}`
      }

      if (parseInt(hours, 10) > 0) {
        return `${parseInt(hours, 10)}:${min}:${sec}`
      } else if (min == 0) {
        return `00:00:${sec}`
      } else {
        return `00:${min}:${sec}`
      }
    }
  }

  render () {
    const todoItems1 = this.state.bodydata1H.map((todo, index) =>
      todo.waitTime === '00:00:00' ? (
        ''
      ) : (
        <MDBBox key={index} tag='p'>
          ✶
          <strong>
            BillNumber: <k style={{ color: '#007E33' }}>{todo.billNumber}</k>{' '}
            WaitTime:{' '}
            <k style={{ color: '#FF8800' }}>
              {this.secondsToHms(todo.waitTime)}
            </k>
          </strong>
        </MDBBox>
      )
    )
    const todoItems2 = this.state.bodydata2H.map((todo, index) => (
      <MDBBox key={index} tag='p'>
        ✶
        <strong>
          BillNumber: <k style={{ color: '#007E33' }}>{todo.billNumber}</k>{' '}
          WaitTime:{' '}
          <k style={{ color: '#FF8800' }}>{this.secondsToHms(todo.waitTime)}</k>
        </strong>
      </MDBBox>
    ))

    const todoItems3 = this.state.bodydata3H.map((todo, index) => (
      ///todo.waitTime==='00:00:00'?'':(
      <MDBBox key={index} tag='p'>
        ✶
        <strong>
          BillNumber: <k style={{ color: '#007E33' }}>{todo.billNumber}</k>{' '}
          WaitTime:{' '}
          <k style={{ color: '#FF8800' }}>{this.secondsToHms(todo.waitTime)}</k>
        </strong>
      </MDBBox>
    ))

    return (
      <>
        <MDBRow>
          <MDBCol>
            <MDBPagination>
              <MDBPageItem disabled></MDBPageItem>
              <MDBPageItem disabled>
                <MDBPageNav className='page-link' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                  <span className='sr-only'>Previous</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem active>
                <MDBPageNav className='page-link'>
                  ข้อมูลปัจจุบัน <span className='sr-only'>(current)</span>
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav href='/AGV012_2' className='page-link'>
                  ข้อมูลย้อนหลัง
                </MDBPageNav>
              </MDBPageItem>
              <MDBPageItem>
                <MDBPageNav className='page-link'>&raquo;</MDBPageNav>
              </MDBPageItem>
            </MDBPagination>
          </MDBCol>
        </MDBRow>
        {/* <MDBTable bordered striped reponsiveLg fixed>
          <MDBTableHead columns={data.columns} />
          <MDBTableBody rows={data.rows} />
        </MDBTable> */}
        <LoadingOverlay active={this.state.loading} spinner text='loading...'>
          <MDBRow className='py-3'>
            <MDBCol md='12'>
              <MDBTable fixed bordered striped responsive>
                <MDBTableHead
                  style={{ 'background-color': '#27293d', color: '#00d6b4' }}
                >
                  <tr>
                    <th>
                      Order 1H <strong>{this.state.bodydata1H.length}</strong>{' '}
                      รายการ
                    </th>
                    <th>
                      Order 2H <strong>{this.state.bodydata2H.length}</strong>{' '}
                      รายการ
                    </th>
                    <th>
                      Order 3H ทั้งหมด{' '}
                      <strong>{this.state.bodydata3H.length}</strong> รายการ
                    </th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr>
                    <td>
                      {todoItems1.length == 0
                        ? 'ยังไม่มี Order นี้'
                        : todoItems1}
                    </td>
                    <td>
                      {todoItems2.length == 0
                        ? 'ยังไม่มี Order นี้'
                        : todoItems2}
                    </td>
                    <td>
                      {todoItems3.length == 0
                        ? 'ยังไม่มี Order นี้'
                        : todoItems3}
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </LoadingOverlay>
      </>
    )
  }
}

export default TbAgv12
