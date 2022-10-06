import React from "react";
import SinglePlayer from "../SinglePlayer/SinglePlayer";
import "./AllPlayers.css";

const AllPlayers = ({ players, cart, setCart }) => {
  return (
    <div>
      <div className="player-container">
        {players?.map((player) => (
          <SinglePlayer
            key={player.idPlayer}
            player={player}
            cart={cart}
            setCart={setCart}
            players={players}
          ></SinglePlayer>
        ))}
      </div>
    </div>
  );
};

export default AllPlayers;
