import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
function Main(props) {
  const [roomId, setroomId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [enter, setenter] = useState(false);
  useEffect(() => {
    if (enter) {
      props.history.push("/play");
    }
  });
  function newgame() {
    console.log("entered");
    props.socket.emit("newGame");
    props.socket.on("roomcode", (data) => {
      console.log("code:", data);
      setRoomCode(data);
    });
  }
  function enterGame() {
    props.socket.emit("enterGame", roomId);
  }
  function computer() {
    props.history.push("/computer");
  }
  props.socket.on("enterroomcode", (data) => {
    if (data === "entered room") {
      props.socket.emit("begin", true);
      console.log(data);
      props.history.push("/play");
    }
  });

  console.log(roomId);
  return (
    <div class="row valign-wrapper" style={{ width: "100%", height: "100vh" }}>
      <div class="col s12 m6 offset-m3 ">
        <div className="card  z-depth-5" style={{ padding: "10%" }}>
          <h3 style={{ margin: "5%" }}>Multiplayer Tic Tac Toe</h3>
          <button
            style={{ margin: "5%" }}
            className="btn-large"
            onClick={() => newgame()}
          >
            Create New Game
          </button>
          <h6>OR</h6>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Game Code"
              id="gamecodeInput"
              value={roomId}
              onChange={(e) => setroomId(e.target.value)}
              className="input-field"
            />
          </div>
          <button
            className="btn-large"
            type="submit"
            onClick={() => enterGame()}
            style={{ margin: "5%" }}
          >
            Join Game
          </button>
          <button
            className="btn-large"
            type="submit"
            onClick={() => computer()}
            style={{ margin: "5%" }}
          >
            Play Against computer
          </button>
          {roomCode !== "" ? (
            <div>{`The room Id is ${roomCode} waiting for your partner`}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
