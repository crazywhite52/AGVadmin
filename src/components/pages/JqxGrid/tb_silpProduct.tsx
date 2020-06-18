import React, { PureComponent, ReactNode } from 'react'
import JqxGrid, { IGridProps, jqx } from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxTooltip from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxtooltip';
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.metrodark.css";


class Tb_silpProduct extends PureComponent<any, IGridProps> {
    private myGrid = React.createRef<JqxGrid>();

    constructor(props: IGridProps) {
        super(props)
        this.myGridOnRowClick = this.myGridOnRowClick.bind(this);
        this.state = {

        }
    }
    private myGridOnRowClick(event: any): void {
        let value = this.myGrid.current!.getrowdata(event.args.rowindex);
        if (value.pstatus == 1) {
            alert('มีรายการนี้แล้ว');
            let value = this.myGrid.current!.unselectrow(10);
            //("#jqxgrid").jqxGrid('unselectrow', event.args.rowindex);
        } else {
            if (value.available === true) {
                this.props.TypeProduct(value.Type, value.Product, value.ProductName, value.Qty, 1, event.args.rowindex);
            } else {
                this.props.TypeProduct(value.Type, value.Product, value.ProductName, value.Qty, 0, event.args.rowindex);
            }
        }



    };
    
    render(): ReactNode {
        const data = this.props.ViewData;
        const source: any = {
            datafields: [
                { name: 'available', type: 'bool' },
                { name: 'Product', type: 'string' },
                { name: 'ProductName', type: 'string' },
                { name: 'Type', type: 'int' },
                { name: 'chk', type: 'int' },
                { name: 'Qty', type: 'int' },
                { name: 'pstatus', type: 'int' },

            ],
            datatype: 'json',
            localdata: data
        };

        const StType = (row: number, columnfield: any, value: any): any => {
            if (value == 0) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#CC3333">ยังไม่มี</k></div>';
            } else if (value === 1) {
                return '<div class="jqx-grid-cell-middle-align" style="margin-top: 8px;"><k style="color:#00CC00">มีแล้ว</k></div>';
            } else {

            }
        }
        // const cellbeginedit = (row: number, datafield: string, columntype: any, value: any): boolean => {
        //     // if (value.pstatus==1) {
        //     //     return false;
        //     // }
        //     return true;
        // };
       
        const columns: any = [
            { text: '', datafield: 'available', columntype: 'checkbox', width: 70,},
            { text: 'Product', datafield: 'Product', width: '20%', editable: false, align: 'center', cellsalign: 'center', },
            { text: 'Product Name', datafield: 'ProductName', width: '50%', editable: false, align: 'center', cellsalign: 'center', },
            { text: 'Qty', datafield: 'Qty', width: '10%', editable: false, align: 'center', cellsalign: 'right', },
            { text: 'Status', datafield: 'pstatus', width: '10%', editable: false, align: 'center', cellsalign: 'right', cellsrenderer: StType },
            { text: 'chk', datafield: 'chk', width: 100, hidden: true, },
            { text: 'Type', datafield: 'Type', width: 100, hidden: true, },

        ]

        return (
            <div>
               
                <JqxGrid
                    altrows={true}
                    ref={this.myGrid}
                    statusbarheight={25}
                    //showaggregates={true}
                    editable={true}
                    //onCellclick={this.myGridOnRowClick}
                    theme="metrodark"
                    pageable={true}
                    pagesizeoptions={['50', '100', '500']}
                    // columnsreorder={true} //ย้ายตำแหน่ง
                    filterable={true}
                    //showfilterrow={true}
                    onCellendedit={this.myGridOnRowClick}
                    height={500}
                    width={'100%'}
                    source={new jqx.dataAdapter(source)}
                    columns={columns}


                />

            </div>
        )
    }
}

export default Tb_silpProduct
