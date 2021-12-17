import React, { Component } from 'react'

export default class selectitem extends Component {
    render() {
        return (
            <div className='container'>
                <div className='row '>
                <div class="card shadow p-3 mb-5 bg-white rounded" style={{width: "13rem",marginLeft:"20px"}}>
  <img class="card-img-top" src="https://m.media-amazon.com/images/I/51TUUg5ClqL._SL1200_.jpg" alt="screw" />
  <div class="card-body">
    <h5 class="card-title">Silver Screw</h5>

    <a href="/inspection" class="btn btn-primary">Inspect</a>
  </div>
</div>
<div class="card shadow p-3 mb-5 bg-white rounded" style={{width: "13rem",marginLeft:"20px"}}>
  <img class="card-img-top" src="https://m.media-amazon.com/images/I/51uNEFQRoZL._SX342_.jpg" alt="screw" />
  <div class="card-body">
    <h5 class="card-title">Copper Screw</h5>

    <a href="/inspection" class="btn btn-primary">Inspect</a>
  </div>
</div>
</div>
            </div>
        )
    }
}
