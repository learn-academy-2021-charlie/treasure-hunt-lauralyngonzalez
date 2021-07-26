import React, { Component } from 'react'
import './App.css'
import Square from './components/Square'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      board: ["?", "?", "?", "?", "?", "?", "?", "?", "?"]
    }
  }

  handleGamePlay = (index) => {
    alert(index)
  }

  render(){
    return(
      <>
        <h1>Treasure Hunt Game</h1>
        <div id="gameboard">
          {this.state.board.map((val, idx) => {
            return (
              <Square
                key={idx}
                value={val}
                index={idx}
                handleGamePlay={this.handleGamePlay}
              />
            )
          })}
        </div>
      </>
    )
  }
}
export default App
