import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MDBIcon, MDBBtn } from "mdbreact";
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";

class Tb_AGV002 extends React.PureComponent<any, IGridProps> {

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
                { name: 'boxno', type: 'string' },
                { name: 'skuCode', type: 'string' },
                { name: 'name', type: 'string' },
                { name: 'quantity', type: 'number' },
            ],
            datatype: 'json',
            localdata: '',
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

            { text: 'boxno',editable:false, width: '20%', filterable: false, align: 'center', cellsalign: 'center', },
            { text: 'skuCode',editable:false, width: '20%', filterable: false, align: 'center', cellsalign: 'center', },
            { text: 'name',editable:false, filterable: false, align: 'center', cellsalign: 'center', width: '40%', },
            { text: 'Quantity', width: 70, cellsalign: 'right' },
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
export default Tb_AGV002;

