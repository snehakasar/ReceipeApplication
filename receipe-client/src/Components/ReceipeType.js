import React, { Component } from "react";
import ReceipeService from "../Services/ReceipeService";
//import FreeBreakfastIcon from '@material-ui/icons/FreeBreakfast';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import HomePage from "./HomePage";

export class ReceipeType extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receipes: []
    };
  }
  componentDidMount() {
    this.fetchAllDetails();
  }
  fetchAllDetails() {
    ReceipeService.fetchAllDetails().then((res) => {
      this.setState({
        receipes: res.data,
      });
    });
  }
  render() {
    const type = this.props.match.params.type;
    return (
      <div>
      <HomePage/><br></br><br></br>
      <div className="container">
        <MDBRow className="row-cols-1 row-cols-md-5 g-4">
          {this.state.receipes.map((receipe) => {
              if(receipe.type==type){
            return (
              <MDBCol>
                <MDBCard style={{ width: '13rem' }}>
                  <MDBCardImage
                    src={receipe.img}
                    position="top"
                  />
                  <MDBCardBody>
                    <MDBCardTitle><Link to={`/${receipe.type}/${receipe._id}`}>{receipe.name}</Link></MDBCardTitle>
                    <MDBCardText>
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            );
          }})}
        </MDBRow>
      </div>
      </div>
    );
  }
}

export default ReceipeType;
