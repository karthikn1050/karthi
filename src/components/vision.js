import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
const imagesPath = {
    minus: "https://www.allthetests.com/quiz30/picture/pic_1387718017_1.jpg",
    plus: "https://i.stack.imgur.com/WeyM8.jpg"
  }
  
  class Vision extends React.Component {
    state = {
      open: true,
      opens:true
    }
    toggleImage = () => {
      this.setState(state => ({ open: !state.open }))
    }
    toggleImages = () => {
        this.setState(state => ({open: !state.open}))
    }
  
    getImageName = () => this.state.open ? 'plus' : 'minus'
  
    render() {
      const imageName = this.getImageName();
      return (
        <div>
          <img alt=""class="col-6 mt-5" style={{width:"300px",height:"300px"}} src={imagesPath[imageName]} onClick={this.toggleImage} />
          <button style={{marginLeft:"20px"}}class=" button btn-success " onClick={this.toggleImage}>Start</button>
          <button style={{marginLeft:"20px"}}className=" button btn-danger" onClick={this.toggleImages}>Stop</button>
       
        </div>
      );
    }
  }
  export default Vision;