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
      gameStatus: null,
      gameDone: false
    }
  }

  // React lifecycle method. Called when component is mounted
  componentDidMount() {
    this.setUpBoard()
  }

  // Sets up the board. Called when component mounts or with play again button
  setUpBoard = () => {
    let treasure = Math.floor(Math.random() * this.state.board.length)
    let bomb;
    
    // Set the bomb location to a position that's not the treasure
    do {
      bomb = Math.floor(Math.random() * this.state.board.length)
    } while (treasure === bomb);
    
    this.setState({
      board: ["?", "?", "?", "?", "?", "?", "?", "?", "?"],
      treasureLocation: treasure,
      bombLocation: bomb,
      guesses: 5,
      gameStatus: "Guesses Left: 5",
      gameDone: false
    })
  }

  // Handles the game play and updates the board.
  handleGamePlay = (index) => {
    const {board} = this.state
    let currentStatus = this.state.gameStatus
    let currentGuesses = this.state.guesses
    let endGame = false

    // Return if the game is over
    if (this.state.gameDone) {
      return
    }

    // Display a palm tree, treasure, or bomb at the square
    // Updates the game status
    if(index === this.state.treasureLocation) {
      board[index] = "💎"
      currentStatus = "Congratulations! You found the treasure!"
      endGame = true
    } else if (index === this.state.bombLocation) {
      board[index] = "💣"
      currentStatus = "Game over. You landed on a bomb ☠️"
      endGame = true
    } else {
      board[index] = "🌴"
      currentGuesses--

      // Check guesses and update status if no more guesses
      if (currentGuesses > 0) {
        currentStatus = "Guesses Left: " + currentGuesses
      } else {
        currentStatus = "You lost! No more guesses!"
        endGame = true
      }
    }
    
    this.setState({
      board: board,
      guesses: currentGuesses,
      gameStatus: currentStatus,
      gameDone: endGame
    })
  }

  // Displays the play again button if game is done
  isGameDone = () => {
    if (this.state.gameDone) {
      return (
        <button type="button" onClick={this.setUpBoard}>Play Again</button>
      )
    }
  }

  render(){
    return(
      <>
        <h1>Treasure Hunt Game</h1>
        
        <h4>{this.state.gameStatus}</h4>
        
        {this.isGameDone()}

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
