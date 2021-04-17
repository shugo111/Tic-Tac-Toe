import React, { Component } from "react";

export class HomePage extends Component {
  constructor() {
    super();

    this.state = {
      player_turn: "X",
      board: ["", "", "", "", "", "", "", "", ""],
      myTurn: "",
      symbol: "X",
    };
  }
  componentDidMount() {}
  squareClicked(index) {
    let player_turn = this.state.player_turn;
    let board = this.state.board;

    board[index] = player_turn;
    let winning_combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winning_combos.length; i++) {
      let winning_row = winning_combos[i];
      let p1 = winning_row[0];
      let p2 = winning_row[1];
      let p3 = winning_row[2];
      if (
        board[p1] === board[p2] &&
        board[p2] === board[p3] &&
        board[p3] === board[p1] &&
        board[p1] !== "" &&
        board[p2] !== "" &&
        board[p3] !== ""
      ) {
        alert(` winner! player ${player_turn} has won the game!`);
      }
    }
    player_turn = player_turn === "X" ? "O" : "X";
    console.log(board);
    this.setState({
      player_turn: player_turn,
      board: board,
    });
  }
  makeMove(index) {
    console.log("enter1");
    if (!this.state.myTurn) {
      return;
    }
    // The space is already checked
    let board = this.state.board;
    if (board[index]) {
      return;
    }

    // Emit the move to the server
    this.props.socket.emit("make.move", {
      symbol: this.state.symbol,
      position: index,
    });
  }
  render() {
    this.props.socket.on("move.made", function (data) {
      let board = this.state.board;
      board[data.position] = data.symbol;
      var myTurn = data.symbol !== this.state.symbol;
      this.setState({ myTurn });
      if (!isGameOver()) {
        if (gameTied()) {
          alert(` Game Drawn`);
        } else {
          renderTurnMessage();
        }
      } else {
        if (myTurn) {
          alert(` Game over. You lost.`);
        } else {
          alert(` Game over. You won!`);
        }
      }
    });

    function isGameOver() {
      let board = this.state.board;
      let winning_combos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < winning_combos.length; i++) {
        let winning_row = winning_combos[i];
        let p1 = winning_row[0];
        let p2 = winning_row[1];
        let p3 = winning_row[2];
        if (
          board[p1] === board[p2] &&
          board[p2] === board[p3] &&
          board[p3] === board[p1] &&
          board[p1] !== "" &&
          board[p2] !== "" &&
          board[p3] !== ""
        ) {
          return true;
        }
      }
    }
    this.props.socket.on("game.begin", function (data) {
      this.setState({ symbol: data.symbol });
      this.setState({ myTurn: this.state.symbol === "X" });
      this.renderTurnMessage();
    });
    console.log(this.state);
    function gameTied() {
      let board = this.state.board;
      if (
        board[0] !== "" &&
        board[1] !== "" &&
        board[2] !== "" &&
        board[3] !== "" &&
        board[4] !== "" &&
        board[5] !== "" &&
        board[6] !== "" &&
        board[7] !== "" &&
        board[8] !== ""
      ) {
        return true;
      }
    }
    function renderTurnMessage() {
      // Disable the board if it is the opponents turn
      if (!this.state.myTurn) {
        alert(` Your opponent's turn`);
        // Enable the board if it is your turn
      } else {
        alert(` Your  turn`);
      }
    }
    console.log(this.props.socket.id);
    return (
      <div>
        <h1>Tic tac toe</h1>
        <div className="board">
          {this.state.board.map((square, index) => {
            return (
              <div onClick={() => this.makeMove(index)} className="square">
                {square}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
