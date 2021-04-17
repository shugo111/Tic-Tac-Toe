import React, { useState, useEffect } from "react";

function Demo2(props) {
  // const [playerTurn, setPlayerTurn] = useState("X");
  const [board, setboard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [myTurn, setmyTurn] = useState("");
  const [symbol, setsymbol] = useState();
  let display = "";
  useEffect(() => {
    props.socket.on("game.begin", function (data) {
      setsymbol(data.symbol);
      setmyTurn(data.symbol === "X" ? true : false);
      renderTurnMessage();
    });
    props.socket.on("newGame", function (data) {});
  });
  function makeMove(index) {
    if (!myTurn) {
      return;
    }
    if (board[index]) {
      return;
    }

    // Emit the move to the server
    props.socket.emit("make.move", {
      symbol: symbol,
      position: index,
    });
  }
  props.socket.on("move.made", function (data) {
    let boards = board;
    boards[data.position] = data.symbol;
    setboard(boards);
    setmyTurn(data.symbol !== symbol);
    if (!isGameOver()) {
      if (gameTied()) {
        props.socket.emit("result", "Game Drawn");
      } else {
        renderTurnMessage();
      }
    } else {
      if (myTurn) {
        props.socket.emit("result", "Game over. You Lost!");
      } else {
        props.socket.emit("result", "Game over. You won!");
      }
    }
    props.socket.on("userResult", (data) => {
      alert(data);
      props.history.push("/");
    });
  });

  function isGameOver() {
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

  function gameTied() {
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
    // // Disable the board if it is the opponents turn
    // var turn = myTurn;
    // if (!turn) {
    //   //alert(` Your opponent's turn`);
    //   display = "<div>{`Your opponent's turn`}</div>";
    //   // Enable the board if it is your turn
    // } else {
    //   display = "<div>{`Your turn`}</div>";
    // }
  }

  return (
    <div>
      <h1>Tic tac toe {props.socket.id}</h1>
      <div className="board">
        {board.map((square, index) => {
          return (
            <div key={index} onClick={() => makeMove(index)} className="square">
              <h1>{square}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Demo2;
