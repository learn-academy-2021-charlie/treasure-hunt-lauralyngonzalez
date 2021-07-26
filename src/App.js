import React, { Component } from 'react'
import './App.css'
import Square from './components/Square'

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      board: ["?", "?", "?", "?", "?", "?", "?", "?", "?"],
      treasureLocation: null,
      bombLocation: null,
      guesses: 5
    }
  }

  //TODO: COMMENT on this lifecycle method
  componentDidMount() {
    let treasure = Math.floor(Math.random() * this.state.board.length)
    let bomb;
    
    // Set the bomb location to a position that's not the treasure
    do {
      bomb = Math.floor(Math.random() * this.state.board.length)
    } while (treasure === bomb);
    
    this.setState({treasureLocation: treasure,
      bombLocation: bomb})
  }

  handleGamePlay = (index) => {
    const {board} = this.state

    // Display a palm tree, treasure, or bomb at the square
    if(index === this.state.treasureLocation) {
      board[index] = "💎"  
    } else if (index === this.state.bombLocation) {
      board[index] = "💣"
    } else {
      board[index] = "🌴"
    }
    
    this.setState({board: board, guesses: this.state.guesses-1})
  }

  render(){
    return(
      <>
        <h1>Treasure Hunt Game</h1>
        <h4>Guesses left: {this.state.guesses}</h4>
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
