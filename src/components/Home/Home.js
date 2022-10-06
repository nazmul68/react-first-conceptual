import React, { useEffect, useState } from "react";
import AllPlayers from "../AllPlayers/AllPlayers";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

import "./Home.css";
const Home = () => {
  const [search, setSearch] = useState(""); //loading data

  const [players, setPlayers] = useState([]); //set data or player

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPlayers(data?.player));
  }, [search]);

  const handleDeleteBtn = (id) => {
    const listedPlayer = cart.filter((player) => player.idPlayer !== id); // that means {player.idPlayer} ei id ta bade cart a jotoghula listed ache seghula dekhabe..
    setCart(listedPlayer);

    // toast("Wow deleted!");
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  // const toastify = () => {
  //     toast("Wow deleted!");
  // }

  return (
    <div>
      <div className="home-container">
        <div className="left-side">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
          />
          <button className="search-btn">Search</button>
          <div className="players-container">
            <AllPlayers
              players={players}
              cart={cart}
              setCart={setCart}
            ></AllPlayers>
          </div>
        </div>
        <div className="right-side">
          <div className="cart">
            <h2>Cart Length : {cart.length}</h2>
            {cart.map((player) => (
              <div className="cart-info-container">
                <li>{player.idPlayer}</li>
                <button
                  onClick={() => {
                    handleDeleteBtn(player.idPlayer);
                  }}
                  className="delete-btn"
                >
                  x
                </button>
                <ToastContainer></ToastContainer>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
