import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MDBIcon, MDBBtn } from "mdbreact";
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";

class Tb_AGV010 extends React.PureComponent<any, IGridProps> {

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
                { name: 'productcode', type: 'string' },
                { name: 'productname', type: 'string' },
                { name: 'txtsearch', type: 'string' },
                { name: 'flag', type: 'int' },
            ],
            datatype: 'json',
            localdata: this.props.Datasku,
            updaterow: (rowid: any, rowdata: any, commit: any): void => {
                // synchronize with the server - send update command   
                commit(true);

                // console.group('Value callInBound');
                // console.log(rowdata);
                // console.groupEnd();
                this.props.updatedata(rowdata);
            }
        };

        const columns: any = [

            { text: 'ProductCode', editable: false, datafield: 'productcode', width: '20%', filterable: false, align: 'center', cellsalign: 'center', },
            { text: 'ProductName', editable: false, datafield: 'productname', width: '50%', filterable: false, align: 'center', },
            { text: 'flag', datafield: 'flag', width: 70, cellsalign: 'right',hidden: true },
            {
                text: 'Status', columntype: 'text', width: '100',align: 'center', cellsrenderer: (row: any) => {
                    const value = this.myGrid.current!.getrowdata(row);
                    if (value.flag == 0) {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;color:green"><b>ใช้งาน</b></div>'
                    } else {
                        return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;color:red"><b>ปิดใช้งาน</b></div>'
                    }

                }, buttonclick: (row: any) => {
                    const value = this.myGrid.current!.getrowdata(row);

                    console.log(value.flag)
                }
            },
            {
                text: 'ปิด/เปิด', columntype: 'button', width: '100',align: 'center', cellsrenderer: (row: any) => {
                    return 'คลิก'

                }, buttonclick: (row: any) => {
                    const value = this.myGrid.current!.getrowdata(row);

                    this.props.Sendflag(value.productcode,value.flag);
                    //console.log(value)

                }
            }

        ]

        return (
            <div>
                <JqxGrid

                    ref={this.myGrid}
                    height={550}
                    width={'100%'}
                    pagesizeoptions={['50', '100', '200']}
                    source={new jqx.dataAdapter(source)}
                    pageable={true}
                    autoheight={false}
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
export default Tb_AGV010;

