import React, { Component } from 'react'
import Chart from 'react-google-charts'
import axios from 'axios';
export default class chart extends Component {
    constructor(){
		super();
		this.state = {
		  items:[],
		 
	  }
	}

    componentDidMount(){
		axios.get('http://localhost:8080/items')
        .then(response => this.setState({ items: response.data}
 
            ));
	}
   
   
    render() {
        return (
            <div>
            <Chart
              width={"500px"}
              height={"300px"}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                ["Task", "Status of Items"],
                ...Object.entries(
                  this.state.items.reduce((prevValue, currValue) => {
                    prevValue[currValue.Status] =
                      prevValue[currValue.Status] === undefined
                        ? 1
                        : prevValue[currValue.Status] + 1;
                    return prevValue;
                  }, {})
                )
              ]}
              options={{
                title: "Item Status"
              }}
              rootProps={{ "data-testid": "1" }}
            />
          </div>
        )
    }
}
