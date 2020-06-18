import React, { PureComponent } from 'react'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCol, MDBRow, MDBContainer } from "mdbreact";
import './../css/agv006.css';
class Card extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <MDBRow>
                <MDBCol size="3">
                    <MDBCard>
                        <MDBCardBody>
                            <MDBCardTitle>Special title treatment</MDBCardTitle>
                            <MDBCardText>
                                With supporting text below as a natural lead-in to additional
                                content.
          </MDBCardText>
                            <MDBBtn color="primary">go somewhere</MDBBtn>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>

        )
    }
}

export default Card