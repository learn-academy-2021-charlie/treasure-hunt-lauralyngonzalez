import React, { Component } from 'react'

class Square extends Component{
  render(){
    return(
      <>
        <div id="square">{this.props.value}</div>
      </>
    )
  }
}
export default Square
