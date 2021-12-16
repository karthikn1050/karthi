import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Chart from './chart';
import AuthService from '../services/auth.service';
export default class report extends Component {
	constructor(){
		super();
		this.state = {
		  items:[],
		  showModeratorBoard: false,
		  showAdminBoard: false,
		  currentUser: undefined
		 
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
		axios.get('http://localhost:8080/items')
        .then(response => this.setState({ items: response.data }));

	  }
	render() {
		const items= this.state.items;
		const {  currentUser } = this.state;
        return (
			<>
			{currentUser&&(
			<div>
			<h2 style={{marginLeft:"500px"}}>Report</h2>
			<Chart />
			<table style={{width:"1000px",marginLeft:"80px"}} class="table">
			<thead class="thead-dark">
			  <tr>
				
				<th scope="col">Item ID</th>
				<th scope="col">Item Name</th>
				<th scope="col">Status</th>
				<th scope="col">Date</th>
			  </tr>
			</thead>
			<tbody>
			{items.map(table => ( 
			  <tr>
				<td>{table.ID}</td>
				<td>{table.ItemName}</td>
				<td>{table.Status}</td>
				<td>{table.Date}</td>
			  </tr>
			))}
			</tbody>
		  </table>
		  
		 
           </div>
			)}  
		   </>
        )
    }
}
