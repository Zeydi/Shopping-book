import React from "react";

const Recipe = props => {
  return (
    <div className="container">
      <div className="collection">
        <li className="collection-item">
          <b>Total: {props.totalPrice} $</b>
        </li>
        <li className="collection-item">
          <b>Discount: {props.bestOffer} $</b>
        </li>
        <li className="collection-item">
          <b>To pay: {props.totalPrice - props.bestOffer} $</b>
        </li>
      </div>
    </div>
  );
};

export default Recipe;
