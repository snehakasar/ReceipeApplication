import React, { Component } from "react";
import ReceipeService from "../Services/ReceipeService";
import SearchBar from "material-ui-search-bar";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded';
import BorderColorRoundedIcon from '@material-ui/icons/BorderColorRounded';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import AdminHomePage from "./AdminHomePage";

export class ManageReceipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receipes: [],
      showReceipes: [],
      searchText: "",
      selectedVal:"",
    };
  }

  componentDidMount() {
    this.fetchAllDetails();
  }
  fetchAllDetails() {
    ReceipeService.fetchAllDetails().then((res) => {
      this.setState({
        receipes: res.data,
        showReceipes: res.data,
      });
    });
  }
  showDetails = (type) => {
    if (type === "all" || type==="") {
      this.setState({
        showReceipes: this.state.receipes,
      });
    } else {
      const showDetail = this.state.receipes.filter((receipe) => {
        if (receipe.type == type) return receipe;
      });
      this.setState({
        showReceipes: showDetail,
      });
    }
  };
  deleteHandler = (receipe) => {
    const confirm = window.confirm("Are you sure to delete this record");
    if (confirm) {
      ReceipeService.deleteRecord(receipe._id).then((res) => {
        this.showDetails(receipe.type);
      });     
    }
    
  };
  searchWithName = () => {
    let serachResult = this.state.showReceipes.filter((receipe) => {
      return receipe.name.toLowerCase().includes(this.state.searchText);
    });
    this.setState({
      showReceipes:serachResult
    })

  };
  render() {
    return (
      <div>
        <AdminHomePage />
        <br></br>
        <div className="container">
          <div className="form-group row">
            <div className="col-3">
              <FormControl variant="outlined" className="form-control">
                <InputLabel id="demo-simple-select-outlined-label">
                  Select
                </InputLabel>
                <Select
                id="dropdwon"
                  labelId="demo-simple-select-outlined-label"
                  onChange={(e) => {this.showDetails(e.target.value)
                  this.setState({selectedVal:e.target.value})
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="rice">Rice</MenuItem>
                  <MenuItem value="snacks">Snacks</MenuItem>
                  <MenuItem value="sweets">Indian Sweets</MenuItem>
                <MenuItem value="cakes">Eggless Cakes</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-3"></div>
            <div className="col-6">
              <SearchBar
               // value={this.state.searchName}
                placeholder="Search Receipe Name"
                onChange={(searchValue) =>
                  this.setState({ searchText: searchValue })
                }
                onRequestSearch={this.searchWithName}
                onCancelSearch={()=>this.showDetails(this.state.selectedVal)}
              />
            </div>
          </div>
          <br></br>
          <MDBRow className="row-cols-1 row-cols-sm-5 g-4">
            {this.state.showReceipes.length!=0?
              (this.state.showReceipes.map((receipe) => {
              return (
                <MDBCard
                  border="secondary"
                  background="white"
                  className="mb-3"
                  style={{ maxWidth: "540px"}}
                >
                  <MDBCardHeader>
                    <MDBCardImage src={receipe.img} fluid></MDBCardImage>
                  </MDBCardHeader>

                  <MDBCardBody className="text-danger">
                    <MDBCardTitle>{receipe.name}</MDBCardTitle>
                    <MDBCardText>
                      <Link to={`/editreceipe/${receipe._id}`} style={{color:"black", textDecoration:"none"}}><BorderColorRoundedIcon/>Edit</Link>
                      <button onClick={() => this.deleteHandler(receipe)}
                      style={{color:"black"}}
                      className="btn btn-outline-white">
                      <Link style={{color:"black", textDecoration:"none"}}><DeleteOutlineRoundedIcon/>Remove</Link>
                      </button>
                      
                    </MDBCardText>
                  </MDBCardBody>
                </MDBCard>
              );
            })):(<label style={{color:"red", fontSize:"25px"}}>Sorry...Record not Available..!!!!</label>)}
          </MDBRow>
        </div>
           
      </div>
    );
  }
}

export default ManageReceipe;
