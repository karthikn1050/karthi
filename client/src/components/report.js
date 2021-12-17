import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Chart from './chart';
import AuthService from '../services/auth.service';
import TableSectionInbound from './tablef';
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
			<div className='container'>
				<h2 style={{alignItems:"center"}}>Report</h2>
			<div className='row'>
			
			<div className='col-5' style={{marginRight:"50px"}}>
			<Chart />
			</div>
			<div className='col-6'>
			{/* <table style={{}} class="table">
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
		  </table> */}
		  <TableSectionInbound />
		  </div>
		  <div></div>
		  </div>
		 
           </div>
			)}  
		   </>
        )
    }
}
