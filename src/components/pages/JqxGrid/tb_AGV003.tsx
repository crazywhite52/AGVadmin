import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MDBIcon, MDBBtn } from "mdbreact";
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import '../index.css';
class Tb_AGV003 extends React.PureComponent<any, IGridProps> {

    private myGrid = React.createRef<JqxGrid>();
    constructor(props: {}) {
        super(props);


    }

    componentDidMount() {
        // console.log('prop_data');
        // console.log(this.props.ViewData);
        // console.log('<------------------->');

    }

    public render() {

        //const data = this.props.ViewData;
        const source: any = {
            datafields: [
                { name: 'billNumber', type: 'string' },
                { name: 'billType', type: 'string' },
                { name: 'priority', type: 'string' },
                { name: 'billDate', type: 'date' },
                { name: 'shipToName', type: 'string' },
                { name: 'remark', type: 'string' },
                { name: 'skuCode', type: 'string' },
                { name: 'quantity', type: 'int' },
                { name: 'ordstatus', type: 'int' },
            ],
            datatype: 'json',
            localdata: this.props.PickData
        };
        const StType = (row: number, columnfield: any, value: any): any => {
            if (value == 0) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#CCFFFF">รอเบิก</k></div>';
            } else if (value === 1) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#00CC00">สำเร็จ</k></div>';
            } else if (value === 2) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#FF6600">ไม่สำเร็จ</k></div>';
            } else if (value === 8) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#FF0000">ยกเลิก</k></div>';
            } else {

            }
        }

        const columns: any = [
            {
                text: '', columntype: 'button', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: 70, buttonclick: (row: any) => {
                    const value = this.myGrid.current!.getrowdata(row);
                    if (value.ordstatus === 8) {
                        alert('รายการนี้อยู่ในสถานะยกเลิกแล้ว');
                    } else {


                        var x = confirm("คุณต้องการยกเลิกรายการ " + value.billNumber + " นี้ใช่หรือไม่?");
                        if (x) {
                            // console.group('Value getrowdata');
                            // console.log('t');
                            // console.groupEnd();
                            this.props.SendPickCancel(value.billNumber);

                        } else {
                            // console.group('Value getrowdata');
                            // console.log('f');
                            // console.groupEnd();
                        }
                    }
                }, cellsrenderer: (row: any) => {
                    const value = this.myGrid.current!.getrowdata(row);
                    return 'Cancel';
                }
            },
            { text: 'BillNumber', datafield: 'billNumber', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '10%', },
            { text: 'BillType', datafield: 'billType', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '10%', },
            { text: 'Priority', datafield: 'priority', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '8%', },
            { text: 'BillDate', datafield: 'billDate', cellsformat: 'dd/MM/yyyy', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '9%', },
            { text: 'ShipToName', datafield: 'shipToName', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '15%', },
            { text: 'Remark', datafield: 'remark', editable: false, filterable: false, align: 'center', cellsalign: 'left', width: '20%', },
            { text: 'SkuCode', datafield: 'skuCode', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '10%', },
            { text: 'Ordstatus', datafield: 'ordstatus', editable: false, filterable: false, align: 'center', cellsalign: 'right', width: 80, cellsrenderer: StType },
            { text: 'Quantity', datafield: 'quantity', editable: false, cellsalign: 'right', align: 'center', width: 80 },
        ]

        return (
            <div>
                <JqxGrid

                    ref={this.myGrid}
                    height={550}
                    width={'100%'}
                    source={new jqx.dataAdapter(source)}
                    pageable={true}
                    autoheight={true}
                    columns={columns}
                    theme="metrodark"
                    editable={true}
                    enabletooltips={true}
                    selectionmode={'singlecell'}
                    editmode={'click'}
                />



            </div>
        );
    }
}
export default Tb_AGV003;

