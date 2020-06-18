import React, { PureComponent } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBTypography,
  MDBAlert,
  MDBCard,
} from "mdbreact";
import "./css/agv009.css";
import AlertBox from "../pages/panel/AlertBox";
import socketIOClient from "socket.io-client";


const socket = socketIOClient("http://172.18.24.113:8014");

class AGV009 extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      Product: [],
      Product2: [],
      daySave:[],
      timesave:[],
      Name: "",
      CheckDateTime: "",
      WaitDateTime: "",
    };
  }
  componentDidMount() {
    this.getData();
    
  }

  getData = () => {
    socket.on("getPickingByProduct", (Product) => {
      //  console.log(Product.alertPickingSku[0]);
    var a = Math.ceil(Product.alertPickingSku[0].length / 2);
     let Product1=Array()
     let Product2=Array()   
    for(var i=0;i<Product.alertPickingSku[0].length;i++){

        if(i<a){

            let setNew=Array();
                setNew={
                    sku_number:Product.alertPickingSku[0][i].sku_number,
                    Sku_name:Product.alertPickingSku[0][i].Sku_name,
                    waitTime:Product.alertPickingSku[0][i].waitTitle,
                    last_pick:Product.alertPickingSku[0][i].last_pick,
                    boxcolor:this.getColor(  Product.alertPickingSku[0][i].dayTime  ,  Product.alertPickingSku[0][i].hourTime),
                    total_picking:Product.alertPickingSku[0][i].total_picking , 
                }

            Product1.push(setNew);


        }else{

            let setNew=Array();
            setNew={
                sku_number:Product.alertPickingSku[0][i].sku_number,
                Sku_name:Product.alertPickingSku[0][i].Sku_name,
                waitTime:Product.alertPickingSku[0][i].waitTitle,
                last_pick:Product.alertPickingSku[0][i].last_pick,
                boxcolor:this.getColor(Product.alertPickingSku[0][i].dayTime  ,  Product.alertPickingSku[0][i].hourTime),
                total_picking:Product.alertPickingSku[0][i].total_picking , 
            }


            Product2.push(setNew);
        }
    }
      this.setState({
        Product: Product1,
        Product2: Product2,
      // },()=>{
      //      console.log(this.state.Product);
      });
    });
  };



  getColor=(day,hr)=>{

        if(day > 2){
            return 'box3'
        }else if(day>0){
            return 'box2'
        }else{
            return 'box'
        }
  }

  splitArray=(Array)=>{
    if(Array){
      let target = Array.split(" ");
     this.state.daySave = target[0];
     this.state.timesave = target[1];

    }
     
    
  }


  
  // // secToHour = (Time) => {
  // //   let d = Number(Time);
  // //   let day = Math.floor(d/(24*3600));
  // //   let hour = Math.floor((d % (24*3600))/3600);
  // //   let min=
  // //   // let d = Number(Time);
  // //   // let day = Math.floor(d / (3600  * 24));
  // //   // let hour = Math.floor((d % (24 * 3600)) / 3600 );
  // //   // let min = Math.floor((d % (24 * 3600 * 3600)) /60);
  // //   // let sec = Math.floor((d % (24 * 3600 * 3600 * 60)) / 60);
  // //   // if (hour   < 10) {hour   = "0"+hour;}
  // //   // if(hour == 0){hour=null;}
  // //   // if(hour == 0&&min == 0){min=null;}
  // //   // if (min < 10) {min = "0"+min;}
  // //   // if (sec < 10) {sec = "0"+sec;}
  // //   // if(Math.floor(d / 3600 / 60 / 24)==0)
  // //   // {day =null }
  // //   // if(hour != null){hour=hour+"H"+":"}
  // //   // if(hour != null||min != null){min=min+"M"+":"}
    
  //   return (
  //     <MDBTypography>
  //       <k>
  //         {day}d{hour}h{min}m{sec}s
  //       </k>
  //     </MDBTypography>
  //   );
  // };

  render() {
  
    const productList1 = this.state.Product.map((Product, index) =>{
        return (
            <AlertBox  sku_number={Product.sku_number}
            Sku_name={Product.Sku_name}  waitTime={Product.waitTime} last_pick={Product.last_pick} boxcolor={Product.boxcolor} tpicking={Product.total_picking}/>
          )
    } 
    );
    const productList2 = this.state.Product2.map((Product, index) =>{
        return (
            <AlertBox  sku_number={Product.sku_number}
            Sku_name={Product.Sku_name}  waitTime={Product.waitTime} last_pick={Product.last_pick} boxcolor={Product.boxcolor} tpicking={Product.total_picking} />
          )
    } 
    );
    return (
      <div>
        <MDBCard className="bgcolor" style={{marginLeft:"auto",marginRight:"auto", maxWidth: "97%"  }}>
          <MDBRow>
            <MDBCol md="12" >
              <MDBTypography
                className="text-left"
                tag="h4"
                variant="display-4"
                
              >
                <k className="txt" style={{ color: "#262262" , }}>
                  STOCK <k style={{ color: "#f1592a" }}>ALERT.</k>
                </k>
              </MDBTypography>
            </MDBCol>
            <MDBCol>
            </MDBCol>
          </MDBRow>
          <MDBRow sm="6" md="6" className="bgcolor2" style={{width:"100%" , marginBottom:'1%'}}>
            <MDBCol md="6">{productList1}</MDBCol>
            <MDBCol md="6">{productList2}</MDBCol>
          </MDBRow>

          {/* <MDBCol md="5" >
                        <hr className='d-none d-sm-block d-md-none' style={{height:2, borderWidth:0 ,color:'#262262',backgroundColor:'#262262'}}/>
                        <h2 className="txt" style={{color:'#262262'}}>Total Alert : 100</h2>
                            <br></br>
                            <MDBRow>
                                <MDBCol md="2"><div className="div1"></div></MDBCol><MDBCol md="1"><h3 className="h3" >20</h3></MDBCol>
                            </MDBRow>
                            <br></br>
                            <MDBRow>
                                <MDBCol md="2"><div className="div2"></div></MDBCol><MDBCol md="1"><h3 className="h3">40</h3></MDBCol>
                            </MDBRow>
                            <br></br>
                            <MDBRow>
                                <MDBCol md="2"><div className="div3"></div></MDBCol><MDBCol md="1"><h3 className="h3">80</h3></MDBCol>
                            </MDBRow>
                         
                            <h2 className="txt" style={{marginTop:'40%',color:'#262262'}}>Total Product Alert : 500</h2>

          </MDBCol> */}
        </MDBCard>
      </div>
    );
  }
}

export default AGV009;
