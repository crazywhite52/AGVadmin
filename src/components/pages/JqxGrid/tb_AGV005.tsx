import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MDBIcon, MDBBtn } from "mdbreact";
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import JqxButton from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxbuttons';

import '../index.css';
class Tb_AGV005 extends React.PureComponent<any, IGridProps> {

    private myGrid = React.createRef<JqxGrid>();
    constructor(props: {}) {

        super(props);
        this.jsonBtnOnClick = this.jsonBtnOnClick.bind(this);

    }

    public componentDidMount(): void {



        //console.log(this.myGrid.current!.sortby('skuBilltrn', 'asc'));
    }
    private jsonBtnOnClick() {
        this.myGrid.current!.exportdata('xls', 'myGrid');
    };
    public render() {

        //const data = this.props.ViewData;
        const source: any = {
            datafields: [
                { name: 'skuCode', type: 'string' },
                { name: 'skuName', type: 'string' },
                { name: 'skuStock', type: 'int' },
                { name: 'skuBilltrn', type: 'int' },
                { name: 'skuStock75', type: 'int' },

            ],
            datatype: 'json',
            localdata: this.props.Data
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

            { text: 'รหัสสินค้า', datafield: 'skuCode', editable: false, align: 'center', cellsalign: 'center', width: '20%', },
            { text: 'ชื่อสินค้า', datafield: 'skuName', editable: false, align: 'center', cellsalign: 'left', width: '50%', },
            { text: 'สินค้าคงเหลือ AGV', datafield: 'skuStock', editable: false, filtertype: 'number', align: 'center', cellsalign: 'right', width: '10%', },
            { text: 'สินค้าระหว่างโอน AGV', datafield: 'skuBilltrn', editable: false, filtertype: 'number', align: 'center', cellsalign: 'right', width: '10%', },
            { text: 'สินค้าคงเหลือ 75', datafield: 'skuStock75', editable: false, filtertype: 'number', align: 'center', cellsalign: 'right', width: '10%', },

        ]

        return (

            <div>
                <div style={{ fontSize: '13px', fontFamily: 'Verdana', float: 'left' }}>
                    <JqxButton onClick={this.jsonBtnOnClick}> Export Excel </JqxButton>
                </div>
                <JqxGrid
                    filterable={true}
                    ref={this.myGrid}
                    height={700}
                    width={'100%'}
                    source={new jqx.dataAdapter(source)}
                    pagesizeoptions={['50', '100', '500']}
                    pageable={true}
                    //pagermode={'simple'}
                    sortable={true}
                    //autoheight={true}
                    columns={columns}
                    theme="metrodark"
                    enabletooltips={true}
                    selectionmode={'singlecell'}
                    showfilterrow={true}

                />



            </div>
        );
    }
}
export default Tb_AGV005;

