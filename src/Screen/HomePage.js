import React, { Component, PureComponent } from "react";

export class HomePage extends PureComponent {
  constructor() {
    super();

    this.state = {
      player_turn: "X",
      board: ["", "", "", "", "", "", "", "", ""],
    };
  }

  count = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  async Clicked(index) {
    // if (this.state.player_turn === "O") {
    //   var item = this.count[Math.floor(Math.random() * this.count.length)];
    //   this.squareClicked(item);
    // }
    var item = this.count[Math.floor(Math.random() * this.count.length)];
    await this.squareClicked(index);
    await this.squareClicked(item);
  }
  squareClicked(index) {
    let player_turn = this.state.player_turn;
    let board = this.state.board;
    const i = this.count.indexOf(index);
    if (i > -1) {
      this.count.splice(i, 1);
    }
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
        if (player_turn === "X") {
          alert(` winner! You has won the game!`);
        } else {
          alert(`Better Luck Next time`);
        }
        this.props.history.push("/");
      }
    }
    player_turn = player_turn === "X" ? "O" : "X";
    this.setState({
      player_turn: player_turn,
      board: board,
    });
  }
  render() {
    return (
      <div>
        <h1>Tic tac toe</h1>
        <div className="board">
          {this.state.board.map((square, index) => {
            return (
              <div
                key={index}
                onClick={() => this.Clicked(index)}
                className="square"
              >
                <h1>{square}</h1>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default HomePage;
