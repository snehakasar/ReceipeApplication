import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import React, { Component } from "react";
import HomePage from "./HomePage";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import UserService from "../Services/UserService";
export class LoginPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             username:"",
             password:"",
             showPassword:false
        }
    }
    onChangeHandler=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    } 
    loginHandler=(e)=>{
        e.preventDefault()
        const {username,password}=this.state
        UserService.login({username,password}).then(res=>{
            if(res.role=="admin")
            this.props.history.push('/manage')
           
        })
          .catch(err=>{
           alert("Please enter valid Credentials");
           this.setState({
               username:"",
               password:""
           })
        })
    }
  render() {
    return (
      <div>
        <HomePage />
        <br></br>
        <br></br>
        <br></br>
        <div className="w-50 mx-auto p-5">
          <h2 className="text-center mb-4">Login</h2>
          <form>
            <div className="form-group">
              <TextField
                name="username"
                label="User Name"
                value={this.state.username}
                onChange={this.onChangeHandler}
                className="form-control form-control-lg"
                type="text"
              />
            </div>
            <br></br>
            <div className="form-group">
              <TextField
                name="password"
                label="Password"
                value={this.state.password}
                onChange={this.onChangeHandler}
                className="form-control form-control-lg"
                type={this.state.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => {
                          this.setState({
                            showPassword: !this.state.showPassword,
                          });
                        }}
                      >
                        {this.state.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <br></br>
            <br></br>
            <div></div>
            <button
              className="btn btn-success form-control form-control-lg"
              onClick={this.loginHandler}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginPage;
