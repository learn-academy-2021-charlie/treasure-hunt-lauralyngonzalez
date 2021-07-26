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
      guesses: 5,
      gameStatus: null
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
    
    this.setState({
      treasureLocation: treasure,
      bombLocation: bomb,
      gameStatus: "Guesses Left: " + this.state.guesses
    })
  }

  handleGamePlay = (index) => {
    const {board, guesses} = this.state
    let currentStatus = this.state.gameStatus

    // Display a palm tree, treasure, or bomb at the square
    if(index === this.state.treasureLocation) {
      board[index] = "💎"
      currentStatus = "You Won!"
    } else if (index === this.state.bombLocation) {
      board[index] = "💣"
      currentStatus = "You Lost!"
    } else {
      board[index] = "🌴"
      currentStatus = "Guesses Left: " + (guesses-1).toString()
    }
    
    this.setState({
      board: board,
      guesses: guesses-1,
      gameStatus: currentStatus
    })
  }

  render(){
    return(
      <>
        <h1>Treasure Hunt Game</h1>
        
        <h4>{this.state.gameStatus}</h4>
        
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
