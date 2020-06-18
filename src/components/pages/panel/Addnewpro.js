import React, { PureComponent } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBInput, MDBModalHeader, MDBModalFooter } from 'mdbreact';
class Addnewpro extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            product: ''
        }
    }
    handleChange = (e) => {
        e.preventDefault();

        this.setState(
            {
                [e.target.name]: e.target.value
            },
            () => {
                // console.group('Value handleChange');
                // console.log(this.state.docid);
                // console.groupEnd();
            }
        );
    }
    toggle = () => {
        this.props.closeModal(false)
    }
    SendPro = () => {
        // console.group('Value SendPro');
        // console.log(this.state.product);
        // console.groupEnd();
        this.props.SendProduct(this.state.product)
    }
    render() {
        return (
            <>
                <MDBContainer>
                    {/* <MDBBtn onClick={this.toggle}>Modal</MDBBtn> */}
                    <MDBModal isOpen={this.props.openModal}>
                        <MDBModalHeader>Update Newproduct</MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput label="product"
                                type="text"
                                onChange={this.handleChange}
                                name="product"
                                outline
                                autoFocus

                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                            <MDBBtn color="primary" onClick={this.SendPro}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                </MDBContainer>
            </>
        )
    }
}

export default Addnewpro