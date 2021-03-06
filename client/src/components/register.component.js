import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Modal,Button } from "react-bootstrap";
import AuthService from "../services/auth.service";
import axios from "axios";
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      isOpen:false,
      userlist:[],
      showAdminBoard: false
    };
  }
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.username,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }
  componentDidMount() {
    
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
      axios.get(`http://localhost:8080/userlist`)
        .then(res => {
          const userlist = res.data;
          this.setState({ userlist });
        })
    }
    
    deleteRow(id, e){
      axios.delete(`http://localhost:8080/delete/${id}`)
        .then(res => {
          console.log(res);
          console.log(res.data);
    
          const userlist = this.state.userlist.filter(item => item.id !== id);
          this.setState({ userlist });
        })
    
    }
    

  render() {
    const userlist= this.state.userlist;
    const showAdminBoard = this.state.showAdminBoard
    return (
      <>
        {showAdminBoard && (
      <div className="col-md-12">
        
       <Button  onClick={() => this.setState({isOpen: true})} style={{marginLeft:"12%"}}>Create User</Button>
      
      <Modal show={this.state.isOpen} onHide={this.closeModal}>
        <Modal.Header >
          <Modal.Title>User Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <div className="col-md-12">
    
    <div >
      

      <Form
        onSubmit={this.handleRegister}
        ref={c => {
          this.form = c;
        }}
      >
        {!this.state.successful && (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                className="form-control"
                name="username"
                value={this.state.username}
                onChange={this.onChangeUsername}
                validations={[required, vusername]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={this.state.email}
                onChange={this.onChangeEmail}
                validations={[required, email]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required, vpassword]}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="roles">Role</label>
              <input
                type="text"
                className="form-control"
                name="role"
                value="User"
                onChange={this.onChangeRole}
                readonly="readonly"
              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block">Create User</button>
            </div>
          </div>
        )}

        {this.state.message && (
          <div className="form-group">
            <div
              className={
                this.state.successful
                  ? "alert alert-success"
                  : "alert alert-danger"
              }
              role="alert"
            >
              {this.state.message}
            </div>
          </div>
        )}
        <CheckButton
          style={{ display: "none" }}
          ref={c => {
            this.checkBtn = c;
          }}
        />
      </Form>
    </div>
  </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModal}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>
      <table class="table" style={{marginTop:"3%" , width:"80%",marginLeft:"120px"}}>
  <thead class="thead-light" >
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Username</th>
      <th scope="col">Email</th>
     {/*  <th scope="col">Role</th> */}
      <th scope="col">CreatedAt</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {userlist.map(table => ( 
    <tr>
      <th scope="row">{table.id}</th>
      <td>{table.username}</td>
      <td>{table.email}</td>
      {/* <td>User</td> */}
      <td>{table.createdAt}</td>
      <td>  
     <button className="btn btn-danger" onClick={(e) => this.deleteRow(table.id, e)}>Delete</button>  
          </td> 
    </tr>
  ))}
    
    
  </tbody>
</table>

     
      </div>
        )}
      </>
    );
  }
}
