import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MDBIcon, MDBBtn } from "mdbreact";
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";
import '../index.css';
class Tb_AGV004 extends React.PureComponent<any, IGridProps> {

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
                { name: 'Brand', type: 'string' },
                { name: 'CategoryID', type: 'string' },
                { name: 'Counter', type: 'string' },
                { name: 'Name', type: 'string' },
                { name: 'Product', type: 'string' },
                { name: 'ProductType', type: 'int' },
                { name: 'Unit', type: 'string' },
                { name: 'VAT', type: 'int' },
                { name: 'Weight', type: 'int' },
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

            { text: 'Brand', datafield: 'Brand', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '10%', },
            { text: 'CategoryID', datafield: 'CategoryID', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '10%', },
            { text: 'Unit', datafield: 'Unit', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '8%', },
            { text: 'Name', datafield: 'Name', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '30%', },
            { text: 'Product', datafield: 'Product', editable: false, filterable: false, align: 'center', cellsalign: 'center', width: '20%', },
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
export default Tb_AGV004;

