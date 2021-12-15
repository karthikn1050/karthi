import React from "react";




export default class Vision extends React.Component {
  constructor(props) {
    super(props);
    this.switchImage = this.switchImage.bind(this);
    this.switchImages =this.switchImages.bind(this);
    this.state = {
      currentImage: 0,
      images: [
        "https://i.stack.imgur.com/WeyM8.jpg",
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80",
        
       
      ]
    };
  }

  switchImage() {
    if (this.state.currentImage < this.state.images.length - 1) {
      this.setState({
        currentImage: 0
      });
    } else {
      this.setState({
        currentImage: 0
      });
    }
    return this.currentImage;
  }
  
  switchImages() {
    if (this.state.currentImage < this.state.images.length - 1) {
      this.setState({
        currentImage: 1
      });
    } else {
      this.setState({
        currentImage: 1
      });
    }
    return this.currentImage;
  }



  render() {
    return (
      <div className="slideshow-container">
        <img style={{width:"500px",height:"500px",marginTop:"100px",marginLeft:"100px"}}
          src={this.state.images[this.state.currentImage]}
          alt="cleaning images"
        />
        <button className="btn btn-success" style={{marginLeft:"100px",width:"100px"}} onClick={this.switchImages}>Start</button>
        <button className="btn btn-danger"style={{marginLeft:"10px",width:"100px"}} onClick={this.switchImage}>Stop</button>
      </div>
    );
  }
}