import jwt from "jwt-simple";
export default class ApiService {
  constructor(domain) {
    this.domain = "http://172.18.0.135:8012";
    this.host_api = "http://172.18.0.162:3000/gateway/routeapinode";

    this.token = "VmriPq93P-jQc=HItb6IpU~go?#UAQ";
    this.secretcode = "123456";
    this.getToken = this.getToken.bind(this);
    this.getSecret = this.getSecret.bind(this);
  }
  getToken() {
    var token = jwt.encode(this.token, this.secretcode);
    return token;
  }
  getSecret() {
    var mis = "mis999*";
    var secret = jwt.encode(this.secretcode, mis);
    return secret;
  }
  agvInbound(branch, billid) {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/agvInbound/" + branch + "/" + billid,
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

  getForInbound(branch, billid, type) {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain +
            "/AGVadmin/getForInbound/" +
            branch +
            "/" +
            billid +
            "/" +
            type,
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

  addInbound(datasend) {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/createProduct",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

  callInBound(datasend) {
    //   datasend=[
    //     {
    //         "billNumber": "4712796-6",
    //         "billType": "STOCK-IN",
    //         "billDate": "2020-04-03 12:34:48.315",
    //         "details": [
    //             {
    //                 "boxno": "4712796-6-1",
    //                 "skuCode": "19221361023",
    //                 "quantity": 1
    //             }
    //         ]
    //     }
    // ]
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/callInBound",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };

      // console.group('Sendbodypass');
      // console.log(bodypass);
      // console.groupEnd();

      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

  // เบิกแมนนวล
  pickingManualist(datasend) {
    // datasend = {
    //   skuCode: "UM.QS0ST.A01",
    //   shipToName: "Mr.Somyot Chaowalit"
    // };
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/pickingManualist",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  callPickingManua(datasend) {
    // datasend = {
    //     "billType": "Manual Request",
    //     "shipToName":"Mr.Somyot Chaowalit",
    //     "remark":"เบิกสินค้าด้วยระบบ Manual",
    //     "details":
    //         {
    //             "skuCode": "8905533028",
    //             "skuName": "MICROPHONE STAND NUBWO M21 GOLD 1-Y",
    //             "quantity": 2
    //         }

    // }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/pickingManualCall",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  getPickingday() {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/getPickingday",
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  pickingCancel(datasend) {
    // datasend =  {
    //   "billNumber": "JIB620909-001"
    // }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/pickingCancel",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  getSkuFromItec(Sku) {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          "http://172.18.0.135:9202/getProductDetail/" + encodeURI(Sku),
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  getStockzero() {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/getStockzero/234",
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  // สร้าง Pending
  createPendingbill(datasend) {
    //   let datasend_ex={
    //     "ID": 4719966,
    //     "DocNo": 4673575,
    //     "DocRef": null,
    //     "BF": 6,
    //     "BranchFrom": "STOCK-1 HeadOffice",
    //     "BT": 75,
    //     "ToBranch": "STOCK J.I.B. Online Pro.",
    //     "OfID": 11490,
    //     "OfName": null,
    //     "Status": 0,
    //     "Received": 0,
    //     "Comment": "",
    //     "CreateTime": "2020-04-15T10:01:56.340Z",
    //     "UpdateTime": "2020-04-15T10:01:56.340Z",
    //     "ProductBill": [
    //         {
    //             "Product": "1201536086",
    //             "ProductName": "PSU DEEPCOOL 850W DQ850-M(80+Gold) 10-Y",
    //             "Type": 0,
    //             "Qty": 2,
    //             "chk": 1
    //         },
    //         {
    //             "Product": "2310392930",
    //             "ProductName": "PSU DEEPCOOL 500W DN  80+ 5-Y",
    //             "Type": 0,
    //             "Qty": 5,
    //             "chk": 0
    //         }
    //     ]
    // }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/createPendingbill",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  viewsPendingbill() {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/viewsPendingbill",
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  createBySku(datasend) {
    // let datasend_ex = {
    //   billNumber: "4673575-6",
    //   skuCode: "1201536086",
    //   name: "PSU DEEPCOOL 850W DQ850-M(80+Gold) 10-Y",
    // };
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/createBySku",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  getSkuNewcreate(sku) {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/getSkuNewcreate/"+encodeURIComponent(sku),
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

  // API สำหรับจัดการสินค้า
  searchProduct(datasend) {
      // datasend= {
      //     txtsearch:"acer"
      // }
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          this.domain + "/AGVadmin/getProductDetail",
          this.secretcode
        ),
        Datapass: datasend,
        Methodpass: "POST",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }
  updateFlag(datasend) {
    //  datasend=   {
	  //       "productcode":"0148001185",
	  //       "flag":0
    //      }
  try {
    let bodypass = Array();
    bodypass = {
      Urlpass: jwt.encode(
        this.domain + "/AGVadmin/updateProductStatus",
        this.secretcode
      ),
      Datapass: datasend,
      Methodpass: "POST",
    };
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mis-access-token": this.getToken(),
        "mis-access-secret": this.getSecret(),
      },
      body: JSON.stringify(bodypass),
    };
    return fetch(this.host_api, options)
      .then((response) => response.json())
      .then((responseData) => {
        return Promise.resolve(responseData);
      });
  } catch (err) {
    return err;
  }
  }
  updateNewproduct(datasend) {
    //  datasend=   {
	  //    "productcode":"0148001185"
    //   }
  try {
    let bodypass = Array();
    bodypass = {
      Urlpass: jwt.encode(
        this.domain + "/AGVadmin/updateProductNew",
        this.secretcode
      ),
      Datapass: datasend,
      Methodpass: "POST",
    };
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mis-access-token": this.getToken(),
        "mis-access-secret": this.getSecret(),
      },
      body: JSON.stringify(bodypass),
    };
    return fetch(this.host_api, options)
      .then((response) => response.json())
      .then((responseData) => {
        return Promise.resolve(responseData);
      });
  } catch (err) {
    return err;
  }
  }


  // API สำหรับ DASHBOARD
  // API ดูข้อมูล 2H  3H ย้อนหลัง
  searchFastorderHis(datasend) {
    // datasend=  {
      //   "dateselect":"2020-05-21"
      // }
  try {
    let bodypass = Array();
    bodypass = {
      Urlpass: jwt.encode(
        "http://172.18.0.135:8014/dashboard/dashboardAGVFastorderHis",
        this.secretcode
      ),
      Datapass: datasend,
      Methodpass: "POST",
    };
    var options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mis-access-token": this.getToken(),
        "mis-access-secret": this.getSecret(),
      },
      body: JSON.stringify(bodypass),
    };
    return fetch(this.host_api, options)
      .then((response) => response.json())
      .then((responseData) => {
        return Promise.resolve(responseData);
      });
  } catch (err) {
    return err;
  }
}
// API เตือนสินค้าหมด Alert
  getData_alertByProduct() {
    try {
      let bodypass = Array();
      bodypass = {
        Urlpass: jwt.encode(
          "http://172.18.0.135:8012/AGVadmin/getPickingByProduct",
          this.secretcode
        ),
        Datapass: [],
        Methodpass: "GET",
      };
      var options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "mis-access-token": this.getToken(),
          "mis-access-secret": this.getSecret(),
        },
        body: JSON.stringify(bodypass),
      };
      return fetch(this.host_api, options)
        .then((response) => response.json())
        .then((responseData) => {
          return Promise.resolve(responseData);
        });
    } catch (err) {
      return err;
    }
  }

}
