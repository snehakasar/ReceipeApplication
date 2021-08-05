import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReceipeService from "../Services/ReceipeService";
import AdminHomePage from "./AdminHomePage";
import { MDBSpinner } from "mdb-react-ui-kit";
export class AddReceipeDetails extends Component {
    constructor(props) {
        super(props)
      
        this.state = {
             type:"",
             name:"",
             img:"",
             steps:"",
             ingredient:"",
             description:"",
             operation:"",
             errors:{},
             loadingImg:false
        }
        
    }
    componentDidMount(){
      {window.location.pathname=="/addreceipe"?this.setState({operation:"Add"}):this.setState({operation:"Edit"})}    
        this.fetchDetails();
    }

    fetchDetails(){
      const id=this.props.match.params.id;
      if(id){
      ReceipeService.fetchOne(id).then(res=>{
        this.setState({
        type:res.data.type,
        name:res.data.name,
        steps:res.data.steps,
        ingredient:res.data.ingredient,
        description:res.data.description,
        img:res.data.img
        })
      })

    }
    }
    changeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    uploadImage=(e)=>{
          e.preventDefault()
          this.setState({
            loadingImg:true
          })
          const {files}=document.querySelector('input[type="file"]')
          const formData=new FormData();
          formData.append('file',files[0])
          formData.append('upload_preset',"rpapxknl")
          const options={
              method:"POST",
              body:formData
          }
          return fetch('https://api.Cloudinary.com/v1_1/dnncq77ue/image/upload',options)
          .then(res=>res.json()).then(res=>{
              this.setState({
                  img:res.secure_url,
                  loadingImg:false
              }) 
              alert("Image Uploaded..!!")        
          }).catch(err=>console.log(err))
  
    }
    DetailsValidOrNot(){
      const {type,name,description,ingredient,steps,img,errors}=this.state
      let isValid=true
      if(!name){
        isValid=false;
        errors["name"]="Please enter Name"
      }
      if(!type){
        isValid=false
        errors["type"]="Please select type"
      }
      if(!description){
        isValid=false
        errors["description"]="Please enter Description"
      }
      
      if(!ingredient){
        isValid=false
        errors["ingredient"]="Please enter ingredient"
      }
      if(!steps){
        isValid=false
        errors["steps"]="Please enter steps"
      }
      if(!img){
        isValid=false
        errors["img"]="Image not Uploaded"
      }
      this.setState({
        errors:errors
      })
      return isValid
    }
    addDetails=(e)=>{
        e.preventDefault();
        const {type,name,img,steps,ingredient,description}=this.state
        const newReceipe={
          type,name,img,steps,ingredient,description
         }
         if(this.DetailsValidOrNot()){
          if(this.state.operation=="Add")
          {
          //create Receipe api
              ReceipeService.createReceipe(newReceipe).then(res=>{
                 alert("Record Added Successfully..!!")
                 this.props.history.push("/manage")
              })
              
            }
            //edit receipe api
            if(this.state.operation=="Edit"){
              const id=this.props.match.params.id;
                ReceipeService.update(id,newReceipe).then(res=>{
                  alert("Updated Successfully..!!")
                  this.props.history.push("/manage")
                })
                
            }
            this.setState({
              type:"",
              name:"",
              img:"",
              steps:"",
              ingredient:"",
              description:""
          })     
         }
        
    }
  render()   {
    const {type,name,steps,img,ingredient,description,errors}=this.state
    return (
      <div>
      <AdminHomePage/><br></br>
        <div className="container">
          <form>
            <div className="form-group row">
              <label className="control-label col-5"></label>
              <label
                className="control-label col-4"
                style={{ fontSize: "25px" }}
              >
                <b>Receipe Details</b>
              </label>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-3" style={{ color: "red" }}>
                <b>*All Fields are Mandatory.</b>
              </label>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Select Type:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
              <select
                className="form-control"
                name="type"
                value={type}
                onChange={this.changeHandler}
              >
              <option value="">--Select Type--</option>
                <option value="breakfast">Breakfast</option>
                <option value="rice">Rice</option>
                <option value="snacks">Snacks</option>
                <option value="sweets">Indian Sweets</option>
                <option value="cakes">Eggless Cakes</option>
              </select>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-3"></label>
              <div className="col-2">
                <label style={{ color: "red" }}>
                  <b>{errors.type}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Name:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Receipe Name"
                   name="name"
                    value={name}
                    onChange={this.changeHandler}
                />
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-3"></label>
              <div className="col-5">
                <label style={{ color: "red" }}>
                  <b>{errors.name}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Description:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <textarea
                  className="form-control"
                  placeholder="Enter Description about Receipe"
                   name="description"
                  value={description}
                  onChange={this.changeHandler}
                  
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-3"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.description}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Ingredient:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <textarea
                  className="form-control"
                  placeholder="Enter Ingredients"
                   name="ingredient"
                  value={ingredient}
                  onChange={this.changeHandler}
                  
                ></textarea>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-3">  </label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.ingredient}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Steps for making Receipe:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-8">
                <textarea
                  className="form-control"
                  placeholder="Enter Step by step procedure"
                  name="steps"
                 value={steps}
             onChange={this.changeHandler}
                ></textarea>
             </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.steps}</b>
                </label>
              </div>
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2">
                <b>Receipe Image:</b>
                <sup style={{ color: "red", fontSize: "15px" }}>
                  <b>*</b>
                </sup>
              </label>
              <div className="col-3">
                <input
                  id="img"
                  type="file"
                  className="form-control"
                  onChange={this.uploadImage}
                />
              </div>
              {this.state.loadingImg ? (
                <MDBSpinner color="primary"></MDBSpinner>
              ) : (
                ""
              )}
            </div>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="col-2"></label>
              <div className="col-3">
                <label style={{ color: "red" }}>
                  <b>{errors.img}</b>
                </label>
              </div>
            </div>
            <br></br>
            <div className="form-group row">
              <label className="control-label col-1"></label>
              <label className="control-label col-2"></label>
              <div className="col-1">
                <button
                  className="btn btn-danger"
                  onClick={this.addDetails}
                >  
                {this.state.operation} 
                </button>
              </div>
              <div className="col-3"> 
                <Link to="/manage"><button className="btn btn-danger">Cancel</button></Link>
              </div>
            </div>
            <br></br>
          </form>
        </div>
  
    </div>
    );
  }
}

export default AddReceipeDetails;
