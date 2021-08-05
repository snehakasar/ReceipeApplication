import React, { Component } from "react";
import ReceipeService from "../Services/ReceipeService";
import HomePage from "./HomePage";
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { Link } from "react-router-dom";
export class ReceipeDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receipe: {},
      steps:[],
      ingredients:[]
    };
  }
  componentDidMount() {
    this.fetchDetails();
  }
  fetchDetails() {
    const id = this.props.match.params.id;
    ReceipeService.fetchOne(id).then((res) => {
      this.setState({
        receipe: res.data,
      });
    var ingredientArray=res.data.ingredient.split("\n") 
    var stepArray=res.data.steps.split("\n")
    this.setState({
        steps:stepArray,
        ingredients:ingredientArray
    })
    });
  }
  
  render() {
    const { receipe,steps ,ingredients} = this.state;
    return (
      <div style={{textAlign:"left"}}>
        <HomePage />
        <br></br>
        <div className="container" style={{textAlign:"left"}}>
          <label style={{ fontSize: "40px" }}>
            <b>{receipe.name}</b>
          </label><br></br><br></br>
            <div className="form-group row">
            <label className="col-11" style={{ fontSize: "18px", lineHeight:"26pt"}}>
            {receipe.description}
          </label>
            </div><br></br><br></br>
            <div className="form-group row">
            <img className="col-9" style={{ height:"500px"}}
            src= {receipe.img}/>
            </div><br></br><br></br>
            <label style={{ fontSize: "40px" }}><b>Ingredients</b></label><br></br>
            <div className="form-group row">
            <label className="col-11" style={{ fontSize: "18px", lineHeight:"26pt"}}>
            {ingredients.map(ingredient=>{
                return (<div><label>{ingredient}</label><br></br></div>)
            })}
          </label>
            </div><br></br><br></br>
            <label style={{ fontSize: "40px" }}><b>Steps For making {receipe.name}</b></label>
            <div className="form-group row">
            <label className="col-11" style={{ fontSize: "18px", lineHeight:"26pt"}}>
            {steps.map(step=>{
                return (<div><label>{step}</label><br></br></div>)
            })}
          </label><br></br>
          <div className="form-group row">
          <Link to={`/${receipe.type}`}>
          <button className="col-1 btn btn-outline-success" style={{borderRadius:"50%"}}>     
          <ArrowBackRoundedIcon/></button></Link>
          </div>
          
            </div>
        </div>
        
        
      </div>
    );
  }
}

export default ReceipeDetails;
