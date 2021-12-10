import React, { Component } from 'react'
import img0 from './blank.JPG'
import img1 from './personss.JPG'
export default  class App extends Component {  
    state={
      imageSrc:'',
      imageAlt:''
    }
  
    handleChange(e){
    
      this.setState({
        imageSrc:'https://www.allthetests.com/quiz30/picture/pic_1387718017_1.jpg',
        
      })
    }
    handleChanges(e){
   
        this.setState({
          imageSrc:'https://i.stack.imgur.com/WeyM8.jpg',
        
        })
      }
  
    render() {  
           return (  
    <div>  
      <button onClick={this.handleChange}>start</button>
      <button onClick={this.handleChanges} >stop</button>
  
  
        <div class="image">  
          <img src={this.state.imageSrc} id="img-change" alt={this.state.imageAlt}/>  
        </div>  
    </div>  
           )  
       }  
   }  
  