import React from "react";
import "./SinglePlayer.css";

const SinglePlayer = ({ players, player, cart, setCart }) => {
  const { strPlayer, strCutout, strNationality, strDescriptionEN, idPlayer } =
    player;
  // console.log(player);

  const handleAddToCart = () => {
    const CartInfo = {
      strPlayer,
      idPlayer,
      strCutout,
    };
    if (cart) {
      const newCart = [...cart, CartInfo];
      if (newCart.length <= 5) {
        setCart(newCart);
      }
      //
      else {
        alert("something went wrong!!");
      }
    }
    //
    else {
      setCart(cart);
    }
  };

  const handleBookmark = () => {
    const bookmarkInfo = {
      strPlayer,
      idPlayer,
      strCutout,
      quantity: 1,
      bookmark: "true",
    };

    const prevBookmark = localStorage.getItem("bookmark");
    const savedBookmark = JSON.parse(prevBookmark);

    if (savedBookmark) {
      const isExist = savedBookmark.find((p) => p.idPlayer === idPlayer);
      //   console.log(isExist); //this is an obj
      if (isExist) {
        // alert("already bookmarked");

        // const newQuantity = isExist.quntity + 1;
        // isExist.quntity = newQuantity;
        isExist.quantity = isExist.quantity + 1;
        localStorage.setItem("bookmark", JSON.stringify(savedBookmark));
      }
      //
      else {
        localStorage.setItem(
          "bookmark",
          JSON.stringify([...savedBookmark, bookmarkInfo])
        );
      }
    }
    //
    else {
      localStorage.setItem("bookmark", JSON.stringify([bookmarkInfo]));
    }
  };
  return (
    <div className="singlePlayer">
      <img
        className="playerImage"
        src={
          strCutout
            ? strCutout
            : " https://www.thesportsdb.com/images/media/player/cutout/52sy491577454781.png"
        }
        alt=""
      />
      <div className="player-info">
        <h5>Name: {strPlayer}</h5>
        <p>Nationality: {strNationality}</p>
        <p>
          {strDescriptionEN ? strDescriptionEN.slice(0, 100) : "no data found"}
        </p>
        <button className="button">details</button>
        <button className="button" onClick={handleAddToCart}>
          Add to cart
        </button>
        <button onClick={() => handleBookmark()} className="button">
          Bookmark
        </button>
      </div>
    </div>
  );
};

export default SinglePlayer;
