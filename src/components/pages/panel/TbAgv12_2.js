import React, { PureComponent } from 'react'
import ApiService from '../../dataAPI/apiConnect'
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
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class TbAgv12_2 extends PureComponent {
  constructor (props) {
    super(props)
    this.ApiCall = new ApiService()
    this.state = {
      loading: false,
      dataagv: [],
      bodydata1H: [],
      bodydata2H: [],
      bodydata3H: [],
      startDate: new Date(),
      DateOder: null
    }
  }
  componentDidMount () {
    this.dashboradAgv12()
  }
  handleChange = date => {
    this.setState(
      {
        startDate: date,
        loading: true
      },
      () => {
        this.setState(
          {
            DateOder: new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit'
            }).format(this.state.startDate)
          },
          () => {
            //console.log(this.state.DateOder)
            var str = this.state.DateOder
            var resdate = str.split('/')
            var startDateres = resdate[2] + '-' + resdate[0] + '-' + resdate[1]
            //console.log(startDateres)
            let datasend = Array()
            datasend = {
              dateselect: startDateres
            }
            this.ApiCall.searchFastorderHis(datasend)
              .then(res => {
                //console.log(res)
                this.setState({ dataagv: res.data }, () => {
                  //console.log(this.state.dataagv)
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
                      this.timeout = setTimeout(() => {
                        this.setState({ loading: false })
                      }, 1500)
                    }
                  )
                })
              })
              .catch(error => {
                console.error(error.message)
              })
          }
        )
      }
    )
  }
  dashboradAgv12 = DateOder => {
    this.setState({ loading: true })
    var date = new Date().getDate() - 1
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    //console.log((date-1)+'/'+month+'/'+year)

    var dateview = year + '-' + month + '-' + date

    let datasend = Array()
    datasend = {
      dateselect: dateview
    }
    this.ApiCall.searchFastorderHis(datasend)
      .then(res => {
        //console.log(res)
        this.setState({ dataagv: res.data }, () => {
          //console.log(this.state.dataagv)
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
              this.timeout = setTimeout(() => {
                this.setState({ loading: false })
              }, 1500)
            }
          )
        })
      })
      .catch(error => {
        console.error(error.message)
      })
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
    const todoItems1 = this.state.bodydata1H.map((todo, index) => (
      <MDBBox key={index} tag='p'>
        ✶
        <strong>
          BillNumber: <k style={{ color: '#007E33' }}>{todo.billNumber}</k>{' '}
          WaitTime:{' '}
          <k style={{ color: '#FF8800' }}>{this.secondsToHms(todo.waitTime)}</k>
        </strong>
      </MDBBox>
    ))
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
        <MDBContainer fluid>
          <MDBRow>
            <MDBCol style={{ marginTop: '1rem' }}>
              <h3 style={{ color: '#27293d' }} className='font-weight-bold'>
                ออเดอร์ด่วน 3-2-1 ชั่วโมง (AGV012)
              </h3>
            </MDBCol>
          </MDBRow>
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
                <MDBPageItem>
                  <MDBPageNav href='/AGV012' className='page-link'>
                    ข้อมูลปัจจุบัน
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem active>
                  <MDBPageNav className='page-link'>
                    ข้อมูลย้อนหลัง{' '}
                    <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      maxDate={new Date()}
                      dateFormat='yyyy/MM/dd'
                    />
                  </MDBPageNav>
                </MDBPageItem>
                <MDBPageItem>
                  <MDBPageNav className='page-link'>&raquo;</MDBPageNav>
                </MDBPageItem>
              </MDBPagination>
            </MDBCol>
          </MDBRow>

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
        </MDBContainer>
      </>
    )
  }
}

export default TbAgv12_2
