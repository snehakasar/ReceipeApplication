import React, { Component } from "react";
import { Link } from "react-router-dom";
import breakfastimg from "../Images/breakfast.jpg";
import riceimg from "../Images/rice.jpg";
import snacksimg from "../Images/snacks.jpg";
import sweetsimg from "../Images/sweets.jpg";
import cakesimg from "../Images/cakes.jpg";

export class ReceipeTypeHomePage extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <br></br>
          <br></br>
          <div className="form-group row">
            <div className="col-4">
            <Link to="/breakfast"><img src={breakfastimg} />
              <br></br>
              Breakfast</Link>
            </div>
            <div className="col-4">
            <Link to="/rice"><img src={riceimg} />
              <br></br>
              Rice</Link>
            </div>
            <div className="col-4">
            <Link to="/snacks"><img src={snacksimg} />
              <br></br>
              Snacks</Link>
            </div>
          </div>
          <div className="form-group row">
          <div className="col-4">
          <Link to="/sweets"><img src={sweetsimg} />
              <br></br>
              Indian Sweets</Link>
            </div>
            <div className="col-4">
            <Link to="/cakes"><img src={cakesimg} />
              <br></br>
              Eggless Cakes</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReceipeTypeHomePage;
