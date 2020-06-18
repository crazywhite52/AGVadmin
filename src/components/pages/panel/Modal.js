import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBCardImage, MDBRow, MDBCol, MDBInput, MDBIcon, MDBCardHeader, MDBBtn, MDBContainer } from "mdbreact";
import tenor from './../../img/Antu_task-complete.svg.png'
class Modal extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
        }
    }
    Success = () => {

    }
    toggle = () => {
        this.setState(
            {
                modal: !this.state.modal
            },
            () => {
                this.props.Clmodal(false);
            }
        );
    }
    render() {
        return (

            <MDBModal isOpen={this.props.opModal} toggle={this.toggle} backdrop={false} centered>

                <MDBModalHeader toggle={false}>บันทึกข้อมูลเรียบร้อยแล้ว</MDBModalHeader>
                <MDBModalBody>
                    <div align="center"><img width="250" src={tenor} alt="success"></img></div>

                </MDBModalBody>
                <MDBModalFooter>
                    <MDBBtn type="submit" onClick={this.toggle} color="primary"> ตกลง</MDBBtn>
                </MDBModalFooter>

            </MDBModal>
        )
    }
}

export default Modal